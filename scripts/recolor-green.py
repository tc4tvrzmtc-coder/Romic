"""Deterministic yarn-only colour correction; never resamples or redraws pixels."""
from pathlib import Path
import hashlib
import json
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MASKS = json.loads((ROOT / 'image-masks.json').read_text())
REFERENCE = 'assets/custom/clutch/lime-front.webp'
TARGETS = {
    'maldives': {'plate': (389, 445, 516, 495), 'minimum_hue': 48},
    'dubai': {'plate': (175, 269, 269, 305), 'minimum_hue': 55},
}

def hsv(rgb):
    hi, lo = rgb.max(2), rgb.min(2)
    span = hi - lo
    hue = np.zeros(hi.shape)
    red = (hi == rgb[:, :, 0]) & (span > 0)
    green = (hi == rgb[:, :, 1]) & (span > 0)
    blue = (hi == rgb[:, :, 2]) & (span > 0)
    hue[red] = ((rgb[:, :, 1] - rgb[:, :, 2])[red] / span[red]) % 6
    hue[green] = (rgb[:, :, 2] - rgb[:, :, 0])[green] / span[green] + 2
    hue[blue] = (rgb[:, :, 0] - rgb[:, :, 1])[blue] / span[blue] + 4
    return hue * 60, np.divide(span, hi, out=np.zeros_like(span), where=hi > 0)

MATRIX = np.array([[.4124564, .3575761, .1804375], [.2126729, .7151522, .0721750], [.0193339, .1191920, .9503041]])
WHITE = np.array([.95047, 1., 1.08883])
DELTA = 6 / 29

def to_lab(rgb):
    linear = np.where(rgb <= .04045, rgb / 12.92, ((rgb + .055) / 1.055) ** 2.4)
    xyz = (linear @ MATRIX.T) / WHITE
    f = np.where(xyz > DELTA ** 3, np.cbrt(xyz), xyz / (3 * DELTA ** 2) + 4 / 29)
    return np.stack([116 * f[:, :, 1] - 16, 500 * (f[:, :, 0] - f[:, :, 1]), 200 * (f[:, :, 1] - f[:, :, 2])], axis=2)

def from_lab(lab):
    fy = (lab[:, :, 0] + 16) / 116
    f = np.stack([fy + lab[:, :, 1] / 500, fy, fy - lab[:, :, 2] / 200], axis=2)
    xyz = np.where(f > DELTA, f ** 3, 3 * DELTA ** 2 * (f - 4 / 29)) * WHITE
    linear = np.clip(xyz @ np.linalg.inv(MATRIX).T, 0, 1)
    return np.clip(np.where(linear <= .0031308, linear * 12.92, 1.055 * linear ** (1 / 2.4) - .055), 0, 1)

def load(path):
    pixels = np.asarray(Image.open(path).convert('RGB'))
    return pixels, pixels.astype(float) / 255

def yarn(rgb, alpha, minimum_hue):
    hue, saturation = hsv(rgb)
    return (alpha > 0) & (hue > minimum_hue) & (hue < 110) & (saturation > .12)

reference_pixels, reference_rgb = load(ROOT / 'site' / REFERENCE)
reference_alpha = np.asarray(Image.open(ROOT / MASKS[REFERENCE]['mask']).convert('L'))
reference_yarn = yarn(reference_rgb, reference_alpha, 55)
reference_yarn[:int(reference_yarn.shape[0] * .5)] = False
reference_mid = np.median(to_lab(reference_rgb)[reference_yarn & (reference_alpha == 255)], axis=0)
report = {'method': 'CIELAB median offset on existing yarn pixels only; lossless WebP', 'reference': REFERENCE, 'reference_sha256': hashlib.sha256((ROOT / 'site' / REFERENCE).read_bytes()).hexdigest(), 'targets': {}}

for model, settings in TARGETS.items():
    relative = f'assets/custom/{model}/lime.webp'
    source = ROOT / 'image-color-originals' / relative
    source.parent.mkdir(parents=True, exist_ok=True)
    if not source.exists():
        source.write_bytes((ROOT / 'site' / relative).read_bytes())
    original, rgb = load(source)
    alpha = np.asarray(Image.open(ROOT / MASKS[relative]['mask']).convert('L'))
    selected = yarn(rgb, alpha, settings['minimum_hue'])
    x1, y1, x2, y2 = settings['plate']
    selected[y1:y2, x1:x2] = False
    sample = selected & (alpha == 255)
    sample[:int(sample.shape[0] * .5)] = False
    lab = to_lab(rgb)
    offset = reference_mid - np.median(lab[sample], axis=0)
    shifted = from_lab(lab + offset)
    strength = alpha.astype(float) / 255
    corrected = np.round((rgb + (shifted - rgb) * strength[:, :, None]) * 255).astype(np.uint8)
    result = original.copy()
    result[selected] = corrected[selected]
    output = ROOT / 'image-color-review' / relative
    output.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(result).save(output, format='WEBP', lossless=True, method=6)
    decoded, _ = load(output)
    assert decoded.shape == original.shape
    assert np.array_equal(decoded[~selected], original[~selected]), 'Non-yarn pixels changed'
    assert np.array_equal(decoded[y1:y2, x1:x2], original[y1:y2, x1:x2]), 'Logo changed'
    assert np.array_equal(decoded[alpha == 0], original[alpha == 0]), 'Background changed'
    assert np.array_equal(decoded, result), 'Encoding was not lossless'
    report['targets'][relative] = {'original_sha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'corrected_sha256': hashlib.sha256(output.read_bytes()).hexdigest(), 'dimensions': [decoded.shape[1], decoded.shape[0]], 'selected_pixels': int(selected.sum()), 'lab_offset': offset.tolist(), 'non_yarn_changed_pixels': 0, 'logo_changed_pixels': 0, 'background_changed_pixels': 0}

(ROOT / 'image-color-review' / 'green-correction.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps(report, indent=2))
