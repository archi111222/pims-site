"""Собирает сайт из четырёх страниц в корень репозитория (index, master-klassy, arenda, kontakty + media, fonts).
python3 source/design/build_site.py            → в корень репозитория
python3 source/design/build_site.py /tmp/out   → в другую папку (для проверки)
python3 source/design/build_site.py --local    → плюс serve.ps1 и запустить.bat для локального просмотра"""
import os, re, shutil, sys
D=os.path.dirname(os.path.abspath(__file__))+'/'
args=[a for a in sys.argv[1:] if not a.startswith('--')]
O=os.path.abspath(args[0] if args else os.path.join(D,'..','..'))+'/'
PAGES={'glavnaya':'index.html','mk':'master-klassy.html','arenda':'arenda.html','kontakty':'kontakty.html'}
IDS={'BTTAFfknzxJcR5ME3dqsDj':'index.html','MgEtoEobnKeekMLqn8AYn1':'master-klassy.html','URE4EdpPvRcacf6s7UaLmV':'arenda.html'}
os.makedirs(O+'media',exist_ok=True)
need=set()
for src,out in PAGES.items():
    s=open(D+src+'.html',encoding='utf-8').read()
    for i,f in IDS.items():
        s=s.replace('https://claude.ai/artifact/'+i+'#devices',f+'#rent')
        # внутренние ссылки — в той же вкладке
        s=re.sub(r'href="https://claude\.ai/artifact/'+i+r'(#[\w-]+)?"\s+target="_blank"\s+rel="noopener"',lambda m:'href="'+f+(m.group(1) or '')+'"',s)
        s=s.replace('https://claude.ai/artifact/'+i,f)
    if out!='index.html':
        # логотип и «ПИМС» в подвале ведут на главную
        s=s.replace('href="#top" class="logo"','href="index.html" class="logo"').replace('href="#top" class="mk3-lg2"','href="index.html" class="mk3-lg2"').replace('<a class="ftr-h" href="#top">','<a class="ftr-h" href="index.html">')
    if out=='index.html': s=re.sub(r'<title>[^<]*</title>','<title>ПИМС — Главная</title>',s,count=1)
    # заглушка для телефонов
    stub=open(D+'site-stub.html',encoding='utf-8').read(); s=s+stub
    open(O+out,'w',encoding='utf-8').write(s)
    for f in os.listdir(D+'media'):
        st=os.path.splitext(f)[0]
        if f in s or '"'+st+'"' in s: need.add(f)
for f in need: shutil.copy2(D+'media/'+f,O+'media/'+f)
if os.path.isdir(O+'fonts'): shutil.rmtree(O+'fonts')
shutil.copytree(D+'fonts',O+'fonts')
if '--local' in sys.argv:
    for f in os.listdir(D+'site-extra'): shutil.copy2(D+'site-extra/'+f,O+f)
print('pages',len(PAGES),'media',len(need),'MB',sum(os.path.getsize(O+'media/'+f) for f in need)//2**20)
