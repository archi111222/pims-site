import re
import os
SRC=os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))+'/'
D=SRC+'design/'
A=SRC+'gen/ar/'
MK=SRC+'gen/mk/'
s=open(D+'glavnaya.src.html',encoding='utf-8').read()
def rr(a,b,n=1):
    global s
    c=s.count(a); assert c==n,(c,a[:120]); s=s.replace(a,b)
VER='Аренда · дизайн v0.10'
s=re.sub(r'Главная · дизайн v0\.\d+',VER,s)
s=re.sub(r'<title>[^<]*</title>','<title>ПИМС — Аренда</title>',s,count=1)
# шапка
rr('''        <a href="#top" class="on">Главная</a>
        <a href="https://claude.ai/artifact/MgEtoEobnKeekMLqn8AYn1" target="_blank" rel="noopener">Мастер-классы</a>
        <a href="https://claude.ai/artifact/URE4EdpPvRcacf6s7UaLmV" target="_blank" rel="noopener">Аренда</a>''',
'''        <a href="https://claude.ai/artifact/BTTAFfknzxJcR5ME3dqsDj" target="_blank" rel="noopener">Главная</a>
        <a href="https://claude.ai/artifact/MgEtoEobnKeekMLqn8AYn1" target="_blank" rel="noopener">Мастер-классы</a>
        <a href="#top" class="on">Аренда</a>''')
m=re.search(r'<nav class="pnav" id="pnav"[^>]*>.*?</nav>',s,flags=re.S)
s=s.replace(m.group(0),'''<nav class="pnav" id="pnav" aria-label="Разделы страницы">
        <a href="#rent">Аппараты</a>
        <a href="#earn">Заработок</a>
        <a href="#how">Как проходит</a>
        <a href="#faq">Вопросы</a>
        <a href="#buy">Покупка</a>
        <a href="#contacts">Контакты</a>
      </nav>''')
# скрываем блоки главной, которых нет на «Аренде»
for sid in ['hm','mk','model','about','atm','reviews','start']:
    m=re.search(r'<section class="([^"]*)"( id="%s")'%re.escape(sid),s); assert m,sid
    s=s.replace(m.group(0),'<section class="%s mk-off"%s'%(m.group(1),m.group(2)),1)
HERO=open(A+'hero.html',encoding='utf-8').read()
rr('<main id="top">\n','<main id="top">\n'+HERO)
rr('</main>','</main>\n<a class="mq-stk" id="mqStk" href="#rent"><i class="mk3-live" aria-hidden="true"></i>Выбрать аппарат<svg class="ic"><use href="#i-chev-r"/></svg></a>')
# каталог = блок аренды с главной: заголовок, фильтр, лента, стрелки
blk={}
for sid in ['rent','way','buy','preps-b','contacts']:
    mm=re.search(r'<section[^>]*id="%s"[^>]*>.*?\n</section>\n'%re.escape(sid),s,flags=re.S); assert mm,sid
    blk[sid]=mm.group(0); s=s.replace(mm.group(0),'',1)
r=blk['rent']
r=re.sub(r'<h2 class="h2">Арендуйте аппарат<br><span class="acc">без вложений</span></h2>','<h2 class="h2">Косметологические<br>аппараты <span class="acc">в&nbsp;аренду</span></h2>',r); assert 'в&nbsp;аренду' in r
r=re.sub(r'<ul class="sh-r rf">.*?</ul>','<p class="sh-r lead-t ar-rd" id="rcD"></p>',r,flags=re.S); assert 'id="rcD"' in r
r=r.replace('<div class="rsl-w">','<div class="ar-rbar"><div class="ar-bt2" id="rcF" role="tablist" aria-label="Формат аренды"><button role="tab" data-f="all" class="on" aria-selected="true"><i><svg><use href="#i-grid"/></svg></i><span><b>Все аппараты</b><small>6 аппаратов</small></span></button><button role="tab" data-f="day" aria-selected="false"><i><svg><use href="#i-truck"/></svg></i><span><b>Посуточно</b><small>от 14&nbsp;000&nbsp;₽ в&nbsp;сутки</small></span></button><button role="tab" data-f="hour" aria-selected="false"><i><svg><use href="#i-clock"/></svg></i><span><b>Почасово</b><small>от 7&nbsp;500&nbsp;₽ в&nbsp;час</small></span></button></div><button type="button" class="btn btn-out btn-m" data-pr>Весь прайс</button></div>\n<div class="rsl-w">',1)
r=r.replace('<section class="sec pan-sec" id="rent"','<section class="sec pan-sec stk-over" id="rent"',1); assert 'stk-over" id="rent"' in r
blk['rent']=r
BL=open(A+'blocks.html',encoding='utf-8').read()
for mm in re.finditer(r'<section[^>]*id="([^"]+)"[^>]*>.*?\n</section>\n',BL,flags=re.S): blk[mm.group(1)]=mm.group(0)
PR=re.search(r'<div class="mdl" id="prModal".*',BL,flags=re.S).group(0)
SEQ=['rent','quiz','earn','arrev','how','buy','faq','guide','way','preps-b','contacts']
k=s.index('</section>',s.index('id="arhero"'))+len('</section>\n')
s=s[:k]+'\n'.join(blk[x] for x in SEQ)+'\n'+PR+'\n'+s[k:]
# карточка аппарата из кода главной — функция для любого набора аппаратов
rr('$("#hmRent").innerHTML=[0,2,3].map(function(k){','var RCF=function(k){')
rr('#i-chev-r"/></svg></button></div></article>\'}).join("")+\n  \'<a class="rc-all','#i-chev-r"/></svg></button></div></article>\'};window.RCF=RCF;$("#hmRent").innerHTML=[0,2,3].map(RCF).join("")+\n  \'<a class="rc-all')
# стили: блоки «Мастер-классов» + «Аренды»
CSS=open(MK+'mk.css',encoding='utf-8').read()+'\n'+open(A+'ar.css',encoding='utf-8').read()
i=s.index('</style>',s.index('</style>')+1)
s=s[:i]+'\n'+CSS+'\n'+s[i:]
JS=open(A+'ar.js',encoding='utf-8').read()
j=s.rindex('})();',0,s.index('</script>',s.index('var $=function')))
s=s[:j]+'\n'+JS+'\n'+s[j:]
rr('h.classList.toggle("team-off",st.tm2!=="on");','h.classList.toggle("team-off",st.tm2!=="on");h.classList.add("mkx-l","m3bg","mk3sw");h.classList.remove("mkx-d");')
s=s.replace('pims-home-v21','pims-ar-v1')
open(D+'arenda.src.html','w',encoding='utf-8').write(s)
print('ok',len(s))
