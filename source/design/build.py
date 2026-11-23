"""Сборка дизайн-версии: вставляет ds.css и pims-ui.css во все страницы и UI-кит.
python3 source/design/build.py → glavnaya.html, ui-kit.html, mk.html, arenda.html, kontakty.html (промежуточные, в git не попадают)."""
import os, shutil
D = os.path.dirname(os.path.abspath(__file__))
ds = open(os.path.join(D, 'ds.css')).read()
INTER = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">'
for name in ('glavnaya', 'ui-kit', 'mk', 'arenda', 'kontakty'):
    src = os.path.join(D, name + '.src.html')
    if not os.path.exists(src):
        continue
    s = open(src).read()
    assert s.count('/*DS*/') == 1, name
    s = s.replace('/*DS*/', ds)
    ui = open(os.path.join(D, 'pims-ui.css')).read()
    k = s.rindex('</style>')
    s = s[:k] + '</style>\n<style id="pims-ui">\n' + ui + '\n' + s[k:]
    if INTER not in s:
        s = s.replace('rel="stylesheet">', 'rel="stylesheet">\n' + INTER, 1)
    open(os.path.join(D, name + '.html'), 'w').write(s)
    print(name, len(s))
assert os.path.isdir(os.path.join(D, 'fonts')), 'нет папки source/design/fonts'
