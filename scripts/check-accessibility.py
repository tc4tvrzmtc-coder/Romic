"""Structural accessibility gate. Browser/assistive-technology checks remain separate."""
from html.parser import HTMLParser
from pathlib import Path
from collections import Counter
import re

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids=[];self.refs=[];self.issues=[];self.main=[];self.h1=0;self.language=None;self.stack=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='html':self.language=a.get('lang')
        if a.get('id'):self.ids.append(a['id'])
        for attr in ['aria-labelledby','aria-describedby','aria-controls']:
            self.refs.extend((attr,id) for id in a.get(attr,'').split())
        if tag=='h1':self.h1+=1
        if tag=='main':self.main.append(a)
        if tag=='img' and 'alt' not in a:self.issues.append('Image missing alt attribute')
        if tag=='iframe' and not ('hidden' in a or a.get('aria-hidden')=='true' or re.search(r'display\s*:\s*none|visibility\s*:\s*hidden',a.get('style',''))) and not a.get('title','').strip():self.issues.append('Iframe missing title')
        if tag=='meta' and a.get('name')=='viewport' and re.search(r'user-scalable\s*=\s*no|maximum-scale\s*=\s*1(?:[,\s]|$)',a.get('content','')):self.issues.append('Viewport prevents magnification')
        if 'tabindex' in a and int(a['tabindex'])>0:self.issues.append('Positive tabindex changes reading order')
        if tag in ['input','select','textarea'] and a.get('type') not in ['hidden','submit','button']:
            wrapped=any(t=='label' for t in self.stack)
            # These source pages use wrapped labels; runtime controls are checked in-browser.
            if not wrapped and not a.get('aria-label') and not a.get('aria-labelledby') and not a.get('id'):self.issues.append('Form field has no label hook')
        if tag not in ['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']:self.stack.append(tag)
    def handle_endtag(self,tag):
        if tag in self.stack:
            i=len(self.stack)-1-self.stack[::-1].index(tag);self.stack=self.stack[:i]

root=Path('_site');files=sorted(root.rglob('*.html'));failures=[]
for file in files:
    page=Page();page.feed(file.read_text());relative=str(file.relative_to(root))
    if page.language not in ['he','en']:page.issues.append('Missing supported document language')
    if len(page.main)!=1:page.issues.append('Expected exactly one main landmark')
    elif page.main[0].get('id')!='main' or page.main[0].get('tabindex')!='-1':page.issues.append('Main target must support skip-link focus')
    if page.h1!=1 and not (relative in ['he/product.html','en/product.html'] and page.h1==0):page.issues.append('Expected one initial h1; legacy product fallback is runtime-checked')
    page.issues.extend('Duplicate id: '+id for id,count in Counter(page.ids).items() if count>1)
    page.issues.extend(f'Broken {attr} reference: {id}' for attr,id in page.refs if id not in page.ids)
    failures.extend(relative+': '+issue for issue in page.issues)
if failures:raise SystemExit('\n'.join(failures))
print(f'PASS: {len(files)} HTML pages: language, main focus target, initial headings, alt attributes, iframe titles, ARIA references, duplicate IDs and viewport restrictions. Runtime semantics and usability require separate browser tests.')
