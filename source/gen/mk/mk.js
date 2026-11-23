/* ===== Мастер-классы: расписание ===== */
(function(){
var SPX={ponomareva:["Екатерина Пономарёва","Косметолог, дерматовенеролог"],kolke:["Алёна Кольке","Пластический хирург, косметолог"],kuzovleva:["Анна Кузовлева","Пластический хирург"],anganova:["Оюна Анганова","Приглашённый спикер"],abaev:["Заза Абаев","Приглашённый спикер"],svyatogor:["Алексей Святогор","Приглашённый спикер"],kodyakov:["Алексей Кодяков","Приглашённый спикер"]};
var AV={kolke:"sp-kolke",ponomareva:"sp-pono"};
var COV={inmode:["RF-лифтинг и IPL","mkc-inmode3"],vol:["Монополярный RF","mkc-vol3"],smas:["SMAS-лифтинг","mkc-smas"],inj:["Препараты","mkc-prep2"],thr:["Нити","mkc-prep2"]};
var CAT=[["all","Все"],["inmode","InMode"],["smas","SMAS-лифтинг"],["vol","Volnewmer"],["inj","Инъекции и нити"]];
var WD={"пн":"понедельник","вт":"вторник","ср":"среда","чт":"четверг","пт":"пятница","сб":"суббота","вс":"воскресенье"};
var MG={10:"октября",11:"ноября",12:"декабря"};
var URL="https://claude.ai/artifact/MgEtoEobnKeekMLqn8AYn1#schedule";
var L=[
 {d:3,m:11,w:"вт",t:"Morpheus8 + Lumecca",p:"Игольчатый RF-лифтинг и фотоомоложение",f:"Теория и практика",sp:"kolke",cat:"inmode",cv:"inmode"},
 {d:6,m:11,w:"пт",t:"Volnewmer",p:"Монополярный RF-лифтинг лица и тела",f:"Теория и практика",tag:"Новинка",sp:"ponomareva",cat:"vol",cv:"vol"},
 {d:12,m:11,w:"чт",t:"Полимолочная кислота и пилинг Exo-Clarity",p:"Коллагеностимуляция и пилинг с ПДРН и экзосомами",f:"Под закупку препарата",sp:"anganova",cat:"inj",cv:"inj"},
 {d:13,m:11,w:"пт",t:"Ultraformer III и BeeLift",p:"SMAS-лифтинг лица и тела",f:"Теория и практика",sp:"ponomareva",cat:"smas",cv:"smas"},
 {d:17,m:11,w:"вт",t:"Нитевой лифтинг",p:"Нити Gruzdev Trend и методика Triple face lift",f:"Под закупку нитей",sp:"abaev",cat:"inj",cv:"thr"},
 {d:19,m:11,w:"чт",t:"Постановка руки на Volnewmer",p:"Индивидуально со спикером, в своём темпе",f:"Постановка руки",tag:"Новинка",sp:"kolke",cat:"vol",cv:"vol"},
 {d:23,m:11,w:"пн",t:"Morpheus8 + Lumecca",p:"Игольчатый RF-лифтинг и фотоомоложение",f:"Теория и практика",sp:"ponomareva",cat:"inmode",cv:"inmode"},
 {d:30,m:11,w:"пн",t:"Интенсив по Volnewmer",p:"Протоколы, практика на моделях и экономика процедуры",f:"Интенсив",tag:"Новинка",sp:"kolke",cat:"vol",cv:"vol"},
 {d:4,m:10,w:"вс",t:"Постановка руки на Morpheus8 + Lumecca",p:"Индивидуально со спикером, в своём темпе",f:"Постановка руки",sp:"kuzovleva",cat:"inmode",cv:"inmode"},
 {d:6,m:10,w:"вт",t:"Morpheus8 + Lumecca",p:"Игольчатый RF-лифтинг и фотоомоложение",f:"Теория и практика",sp:"kolke",cat:"inmode",cv:"inmode"},
 {d:8,m:10,w:"чт",t:"Volnewmer",p:"Монополярный RF-лифтинг лица и тела",f:"Теория и практика",sp:"ponomareva",cat:"vol",cv:"vol"},
 {d:12,m:10,w:"пн",t:"Juvelook и Lenisna",p:"Инъекционные коллагеностимуляторы",f:"Под закупку препарата",sp:"svyatogor",cat:"inj",cv:"inj"},
 {d:15,m:10,w:"чт",t:"Нити Gruzdev Trend",p:"Экспертный курс по нитевому лифтингу",f:"Под закупку нитей",sp:"kodyakov",cat:"inj",cv:"thr"},
 {d:22,m:10,w:"чт",t:"Volnewmer",p:"Монополярный RF-лифтинг лица и тела",f:"Теория и практика",sp:"kolke",cat:"vol",cv:"vol"},
 {d:27,m:10,w:"вт",t:"Morpheus8 + Lumecca",p:"Игольчатый RF-лифтинг и фотоомоложение",f:"Теория и практика",sp:"ponomareva",cat:"inmode",cv:"inmode"}
];
var TODAY=new Date(2026,10,1);
L.forEach(function(x){x.dt=new Date(2026,x.m-1,x.d);x.past=x.dt<TODAY});
var st2={c:"all",s:"up",all:false},LIM=(innerWidth<1440&&innerWidth>1000)?6:8;
function list(){return L.filter(function(x){return (st2.s==="past")===x.past&&(st2.c==="all"||x.cat===st2.c)}).sort(function(a,b){return st2.s==="past"?b.dt-a.dt:a.dt-b.dt})}
function ini(n){return n.split(" ").map(function(w){return w[0]}).join("").slice(0,2)}
function card(x){var cv=COV[x.cv],s=SPX[x.sp],av=AV[x.sp],dm=x.d+" "+MG[x.m];
  var tags=x.tag?'<span class="chip chip-lime">'+x.tag+'</span>':(/^Под закупку/.test(x.f)?'<span class="chip chip-w" title="Участие без оплаты — при закупке у ПИМС, условия в карточке">'+x.f+'</span>':'');
  var ac=x.past?'<a class="btn btn-ink" href="'+tg("Здравствуйте! Хочу на следующий мастер-класс «"+x.t+"». Напишите, когда будет дата.")+'" target="_blank" rel="noopener">Напомнить о дате</a>'
    :'<a class="btn btn-red" href="'+tg("Здравствуйте! Хочу записаться на мастер-класс «"+x.t+"» "+dm+".")+'" target="_blank" rel="noopener">Записаться</a><button type="button" class="btn cv-2" data-mkd="'+x.d+'" data-mkmo="'+x.m+'">Подробнее<svg class="ic chv"><use href="#i-chev-r"/></svg></button>';
  return '<article class="mkh mkc'+(x.past?' past':'')+'">'+
   '<div class="phd mkc-im has-v"><img class="vimg" src="media/'+cv[1]+'.jpg" alt="" loading="lazy"><span>Фото с мастер-класса</span><div class="mkc-cov" aria-hidden="true"><em>'+cv[0]+'</em><img class="ph" src="media/'+cv[1]+'.jpg" alt=""></div>'+(tags?'<div class="mkc-tags">'+tags+'</div>':'')+'<div class="mkc-pd"><b>'+x.d+'.'+x.m+'</b><span>'+x.w+'</span></div></div>'+
   '<div class="mkc-b"><h3>'+nwh(x.t)+'</h3><p>'+nwh(x.p)+'</p><div class="mkh-sp"><span class="phd round ava'+(av?' has-v':'')+'">'+(av?'<img class="vimg" src="media/'+av+'.jpg" alt="'+s[0]+'" loading="lazy">':'')+'<span>'+(av?'':ini(s[0]))+'</span></span><span><b>'+s[0]+'</b><small>'+s[1]+'</small></span></div>'+
   '<div class="mkh-ac cta-v">'+ac+'</div></div></article>'}
function draw(){var a=list(),g=$("#schG"),n=st2.all?a.length:Math.min(LIM,a.length);
  g.innerHTML=a.length?a.slice(0,n).map(card).join(""):'<p class="sch-empty">В этом месяце мастер-классов по теме нет — напишите менеджеру, подскажем ближайшую дату.</p>';
  if(typeof tgIcons==="function")tgIcons(g);
  var mb=$("#schMore");mb.parentNode.hidden=a.length<=n;mb.textContent="Показать ещё "+(a.length-n);
  $("#schF").innerHTML=CAT.map(function(c){var k=L.filter(function(x){return (st2.s==="past")===x.past&&(c[0]==="all"||x.cat===c[0])}).length;return '<button data-c="'+c[0]+'"'+(c[0]===st2.c?' class="on"':'')+'>'+c[1]+'<small>'+k+'</small></button>'}).join("");
  $$("#schS button").forEach(function(b){b.classList.toggle("on",b.dataset.s===st2.s)})}
$("#schF").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;st2.c=b.dataset.c;st2.all=false;draw()});
$("#schS").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;st2.s=b.dataset.s;st2.all=false;draw()});
$("#schMore").addEventListener("click",function(){st2.all=true;draw()});
draw();
/* обложка: карточка «Ближайший мастер-класс» (прототип: тест длинного названия — html.mknxl) */
(function(){var c=document.getElementById("mk3nx");if(!c)return;
function ini(n){return n.split(" ").map(function(w){return w[0]}).join("").slice(0,2)}
function r(){var up=L.filter(function(x){return new Date(2026,x.m-1,x.d)>=TODAY}),n=up[0];
 if(document.documentElement.classList.contains("mknxl"))n=up.filter(function(x){return x.t.length>30})[0]||n;if(!n)return;
 c.querySelector(".mk3-nx-d").textContent=n.d+" "+MG[n.m];c.querySelector(".mk3-nx-t").textContent=n.t;
 var CUT={inmode:"dv-inmode3.webp",vol:"dv-vol2.webp",smas:"dv-uf3.webp"},im=c.querySelector(".mk3-nx-im");im.classList.toggle("cut",!!CUT[n.cv]);im.querySelector("img").src="media/"+(CUT[n.cv]||COV[n.cv][1]+".jpg");c.dataset.d=n.d;c.dataset.m=n.m;}
r();c.addEventListener("click",function(e){if(window.openProtoMK){e.preventDefault();openProtoMK(+c.dataset.d,+c.dataset.m)}});(function(){var up=L.filter(function(x){return new Date(2026,x.m-1,x.d)>=TODAY}),n=up[0],e=document.getElementById("mqCtaNext");if(n&&e)e.textContent="Ближайший — "+n.d+" "+MG[n.m]+", "+WD[n.w]+": "+n.t})();new MutationObserver(r).observe(document.documentElement,{attributes:true,attributeFilter:["class"]})})();
window.MKD={L:L,TODAY:TODAY,WD:WD,MG:MG,COV:COV,SPX:SPX,AV:AV,tg:tg};
})();

/* панель прототипа: Esc и клик мимо — свернуть */
(function(){var p=document.getElementById("proto"),h=document.getElementById("protoH");if(!p||!h)return;
function close(){if(!p.classList.contains("min"))h.click()}
document.addEventListener("keydown",function(e){if(e.key==="Escape")close()});
document.addEventListener("click",function(e){if(!p.contains(e.target))close()})})();

/* спикеры и FAQ (из прототипа) */
(function(){
var L=MKD.L,TODAY=MKD.TODAY,WD=MKD.WD;
var SPD=[
 {k:"ponomareva",n:"Екатерина Пономарёва",r:"Косметолог, дерматовенеролог",img:"sp-pono",c:["Morpheus8","Lumecca"],f:"Мастер-классы по InMode",exp:"12 лет",rg:["Тренер по аппаратным методикам","Ведёт большую часть мастер-классов по InMode"]},
 {k:"kolke",n:"Алёна Кольке",r:"Пластический хирург",img:"sp-kolke",tmp:1,c:["Volnewmer","InMode"],f:"RF-лифтинг и Lumecca",exp:"10 лет",rg:["Ведёт интенсив по Volnewmer","RF-методики и фотоомоложение"]},
 {k:"kuzovleva",n:"Анна Кузовлева",r:"Пластический хирург",img:"sp-kuz2",tmp:1,c:["InMode","Постановка руки"],f:"Практика без страха на InMode",exp:"8 лет",rg:["Тренер по аппаратным методикам","Практика без страха на InMode"]},
 {k:"bendlin",n:"Илья Бендлин",r:"Косметолог, к. м. н.",img:"sp-bend",tmp:1,c:["Ultraformer III","BeeLift"],f:"Автор техники BendLift",exp:"16 лет",edu:"Кандидат медицинских наук",rg:["16 лет практики","Автор запатентованной техники BendLift","Курс по SMAS на трёх аппаратах"]},
 {k:"filatova",n:"Анна Филатова",r:"Косметолог",img:"sp-filat",tmp:1,c:["Ultraformer"],f:"SMAS-лифтинг на Ultraformer",exp:"27 лет",rg:["27 лет практики"]}];
SPD=SPD.concat([
 {k:"anganova",n:"Оюна Анганова",r:"Приглашённый спикер",f:"Полимолочная кислота, пилинги",c:["Препараты"],rg:["Ведёт мастер-класс по полимолочной кислоте и пилингу Exo-Clarity"]},
 {k:"abaev",n:"Заза Абаев",r:"Приглашённый спикер",f:"Нитевой лифтинг",c:["Нити Gruzdev Trend"],rg:["Ведёт мастер-класс по нитевому лифтингу"]},
 {k:"kodyakov",n:"Алексей Кодяков",r:"Приглашённый спикер",f:"Курс по нитям Gruzdev Trend",c:["Нити Gruzdev Trend"],rg:["Ведёт экспертный курс по нитевому лифтингу"]},
 {k:"svyatogor",n:"Алексей Святогор",r:"Приглашённый спикер",f:"Juvelook и Lenisna",c:["Препараты"],rg:["Ведёт мастер-класс по инъекционным коллагеностимуляторам"]}]);
var INV=[["Алексей Святогор","Juvelook и Lenisna"],["Алексей Кодяков и Заза Абаев","нити Gruzdev Trend"],["Оюна Анганова","полимолочная кислота, пилинги"]];
function ini(n){return n.split(" ").map(function(w){return w[0]}).join("").slice(0,2)}
function W(t){return '<span class="mq-wait">'+t+'</span>'}
function ph(s,big){return s.img?'<img src="media/'+s.img+'.jpg" alt="'+s.n+'"'+(big?'':' loading="lazy"')+'>':'<span class="mq-s-in">'+ini(s.n)+'<small>портрет — ждём</small></span>'}
var sp=document.getElementById("mqSp");
if(sp){sp.innerHTML=SPD.map(function(s,i){return '<article class="mq-s" data-sp="'+i+'" tabindex="0" role="button" aria-label="'+s.n+' — подробнее"><div class="mq-s-ph">'+ph(s)+(s.exp?'<span class="chip chip-lime mq-s-exp">'+s.exp+' практики</span>':'')+(s.tmp?'<em class="ctg ctg-v mq-s-tmp"><b>Заглушка</b>· фото не спикера</em>':'')+'<span class="mq-s-pl"><b>'+s.n+'</b><span>'+s.r+'</span></span></div><div class="mq-s-c"><p>'+s.f+'</p><span class="mq-s-more">О спикере<i class="mq-s-go" aria-hidden="true"><svg class="ic"><use href="#i-chev-r"/></svg></i></span></div></article>'}).join("");
 (function(){var nav=document.querySelectorAll("#speakers [data-spn]");function upd(){var mx=sp.scrollWidth-sp.clientWidth-2;nav[0].disabled=sp.scrollLeft<=2;nav[1].disabled=sp.scrollLeft>=mx}
  [].forEach.call(nav,function(bt){bt.addEventListener("click",function(){var c=sp.querySelector(".mq-s");sp.scrollBy({left:(c.offsetWidth+12)*+bt.dataset.spn,behavior:"smooth"})})});
  sp.addEventListener("scroll",function(){requestAnimationFrame(upd)},{passive:true});function bl(){var w=sp.parentElement,cs=getComputedStyle(w);sp.style.setProperty("--bleed",(w.getBoundingClientRect().left+parseFloat(cs.paddingLeft))+"px")}bl();window.addEventListener("resize",function(){bl();upd()});upd();if(typeof dragScroll==="function")dragScroll(sp)})();
 var M=document.getElementById("spModal");document.body.appendChild(M);
 function openSp(i){var s=SPD[i];
  document.getElementById("spL").innerHTML=ph(s,true)+(s.exp?'<span class="chip chip-lime mq-spm-exp">'+s.exp+' практики</span>':'');
  var up=L.filter(function(x){return x.sp===s.k&&new Date(2026,x.m-1,x.d)>=TODAY});
  document.getElementById("spSc").innerHTML='<div class="mq-spm-hd"><h3 id="spTitle">'+s.n+'</h3><p>'+s.r+'</p></div>'+
   '<dl class="mq-spm-f"><div class="w"><dt>Образование</dt><dd>'+(s.edu||W('вуз, ординатура — ждём'))+'</dd></div><div class="w"><dt>Направления</dt><dd>'+s.c.join(", ")+'</dd></div></dl>'+
   (false&&up.length?'<b class="mq-spm-lb">Ближайшие мастер-классы</b><ul class="mq-spm-mk">'+up.map(function(x){return '<li><span class="d"><b>'+x.d+'.'+x.m+'</b>'+WD[x.w]+'</span><span class="t"><b>'+x.t+'</b>'+x.p+'</span><a class="btn btn-out btn-sm" href="#schedule" data-x>Подробнее</a></li>'}).join("")+'</ul>':'')+
   '<b class="mq-spm-lb">О спикере</b><ul class="mq-spm-rg">'+s.rg.map(function(x){return '<li>'+x+'</li>'}).join("")+'</ul>';
  openModal(M)}
 sp.addEventListener("click",function(e){var c=e.target.closest("[data-sp]");if(c)openSp(+c.dataset.sp)});
 sp.addEventListener("keydown",function(e){var c=e.target.closest("[data-sp]");if(c&&(e.key==="Enter"||e.key===" ")){e.preventDefault();openSp(+c.dataset.sp)}});
 M.addEventListener("click",function(e){var a=e.target.closest('a[href="#schedule"]');if(a){closeModal(M)}})}
var DAYL='<ul><li><b>10:00–13:00</b> — теория: технология, показания и противопоказания, параметры, разбор случаев.</li><li><b>13:00</b> — кофе и лёгкий обед.</li><li><b>13:30</b> — практика: каждый врач работает со своей моделью, спикер рядом. Модели записаны по часу, время согласует менеджер.</li></ul>';
var FQ=[
 ["Как проходит мастер-класс?","<p>Начало в 10:00.</p>"+DAYL],
 ["Сколько стоит мастер-класс?","<p>С моделью — для вас бесплатно, модель оплачивает только процедуру: от 7 500 ₽ за Lumecca до 26 000 ₽ за Morpheus8 на тело. Без модели — 10 000 ₽.</p>"],
 ["У меня нет модели. Можно прийти?",'<p>Да. Без модели участие стоит 10 000 ₽ — вы слушаете теорию и смотрите практику. Если хотите поработать руками, лучше прийти со своей моделью.<span class="pm">помогаете ли найти модель?</span></p>'],
 ["Я только начинаю работать на аппаратах. Мне подойдёт?","<p>Да. Многие врачи приходят без опыта на конкретном аппарате. На практике спикер подбирает параметры вместе с вами и поправляет технику. Если хотите спокойнее — выберите индивидуальную постановку руки.</p>"],
 ["Что, если на нужную дату нет мест?","<p>Менеджер предложит ближайшую. Популярные темы повторяются несколько раз в месяц — например, Morpheus8 + Lumecca.</p>"],
 ["Как работает предоплата 5 000 ₽?",'<p>Закрепляет за вами место и время для модели. На следующий день менеджер свяжется и уточнит детали.<span class="pm">засчитывается ли, возврат</span></p>'],
 ["Что я получу в конце?",'<p>Сертификат о прохождении мастер-класса.<span class="pm">диплом после абонемента?</span></p>'],
 ["Своего аппарата нет. Где потом работать?","<p>В ПИМС — почасово, с расходниками и документами на месте. Или берите аппарат посуточно: привезём и установим в вашей клинике.</p>"],
 ["Будет ли поддержка после обучения?","<p>Да. Вы попадаете в чат врачей ПИМС — там можно задать вопрос спикерам по параметрам и пациентам.</p>"],
 ["Можно отправить на обучение нескольких врачей клиники?","<p>Да. Подойдёт абонемент — 6 мастер-классов за 3 месяца, посещения можно распределить между врачами одной клиники. Или выездной мастер-класс в вашей клинике.</p>"]];
var fq=document.getElementById("mqFaq");
if(fq){fq.innerHTML=FQ.map(function(q,i){return '<details class="mq-q'+(i===0?' on':'')+'"'+(i===0?' open':'')+'><summary>'+q[0]+'<i aria-hidden="true"></i></summary><div class="mq-q-a"><div class="mq-q-i">'+q[1]+'</div></div></details>'}).join("");
 var RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches,D=420,E="cubic-bezier(.22,.61,.36,1)";
 function shut(d){if(!d.open)return;var a=d.querySelector(".mq-q-a");d.classList.remove("on");if(RM){d.open=false;return}
  var h=a.offsetHeight;var an=a.animate([{height:h+"px",opacity:1},{height:"0px",opacity:0}],{duration:D,easing:E});an.onfinish=function(){if(!d.classList.contains("on"))d.open=false}}
 function show(d){var a=d.querySelector(".mq-q-a");d.open=true;d.classList.add("on");if(RM)return;var h=a.offsetHeight;a.animate([{height:"0px",opacity:0},{height:h+"px",opacity:1}],{duration:D,easing:E})}
 fq.addEventListener("click",function(e){var sm=e.target.closest("summary");if(!sm)return;e.preventDefault();var d=sm.parentNode;
  if(d.classList.contains("on"))shut(d);else{[].forEach.call(fq.querySelectorAll("details.on"),shut);show(d)}})}
})();

/* закреплённая кнопка «Смотреть ближайшие мастер-классы» */
(function(){var b=document.getElementById("mqStk");if(!b||!("IntersectionObserver" in window))return;
 var vis={},ids=["mkhero","schedule","lead","contacts","mqFmB","mqAbn"];
 function upd(){b.classList.toggle("on",!ids.some(function(k){return vis[k]}))}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){vis[e.target.id]=e.isIntersecting});upd()},{threshold:0,rootMargin:"0px 0px -10% 0px"});
 ids.forEach(function(k){var el=document.getElementById(k);if(el)io.observe(el)});})();

/* абонемент: карточка-кнопка открывает поп-ап */
(function(){var b=document.getElementById("mqAbn"),M=document.getElementById("abnModal");if(!b||!M)return;document.body.appendChild(M);
 b.addEventListener("click",function(){openModal(M)});})();

/* форматы: вкладки */
(function(){var r=document.getElementById("mqFx");if(!r)return;
 r.addEventListener("click",function(e){var t=e.target.closest(".mq-fx-tabs [data-fx]");if(!t)return;var k=t.dataset.fx;
  [].forEach.call(r.querySelectorAll("[data-fx]"),function(x){x.classList.toggle("on",x.dataset.fx===k)});
  [].forEach.call(r.querySelectorAll(".mq-fx-tabs button"),function(x){x.setAttribute("aria-selected",x.dataset.fx===k)})});})();


/* ===== окно мастер-класса — из согласованного прототипа ===== */
(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var TG="https://t.me/marina_pims";
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]})}
function typo(){}
var st={mw:"tabs"};
var SP={
  ponomareva:{exp:"",n:"Екатерина Пономарёва",s:"Косметолог, дерматовенеролог",role:"Косметолог, лазеротерапевт, дерматовенеролог",rg:["Тренер по аппаратным методикам","Ведёт большую часть мастер-классов по InMode"],c:["Morpheus8","Lumecca","Ultraformer","Volnewmer"]},
  kolke:{n:"Алёна Кольке",s:"Пластический хирург",role:"Пластический хирург, косметолог",rg:["Ведёт интенсив по Volnewmer","RF-методики и фотоомоложение"],c:["Volnewmer","InMode"]},
  kuzovleva:{n:"Анна Кузовлева",s:"Пластический хирург",role:"Пластический хирург",rg:["Тренер по аппаратным методикам","Практика без страха на InMode"],c:["InMode","Постановка руки"]},
  bendlin:{exp:"16 лет",edu:"кандидат медицинских наук",n:"Илья Бендлин",s:"К. м. н., косметолог",role:"Косметолог, дерматовенеролог, автор техники BendLift",rg:["16 лет практики","Автор запатентованной техники BendLift","Курс по SMAS на трёх аппаратах"],c:["Ultraformer III","Ultraformer MPT","BeeLift"]},
  filatova:{exp:"27 лет",n:"Анна Филатова",s:"Косметолог",role:"Косметолог",rg:["27 лет практики"],c:["Ultraformer"]},
  anganova:{n:"Оюна Анганова",s:"Приглашённый спикер"},
  abaev:{n:"Заза Абаев",s:"Приглашённый спикер"},
  svyatogor:{n:"Алексей Святогор",s:"Приглашённый спикер"},
  kodyakov:{n:"Алексей Кодяков",s:"Приглашённый спикер"}
};
var INV=[["Алексей Святогор","Juvelook и Lenisna"],["Алексей Кодяков и Заза Абаев","нити Gruzdev Trend"],["Оюна Анганова","полимолочная кислота, пилинги"]];
function ini(n){return n.split(" ").map(function(x){return x[0]}).join("").slice(0,2)}
function avs(list){return '<span class="avs">'+list.map(function(k){return '<span class="ava">'+ini(SP[k].n)+'</span>'}).join("")+'</span>'}
function spNames(list){return list.length>1?list.map(function(k){return SP[k].n.split(" ")[1]||SP[k].n}).join(", "):SP[list[0]].n}
function spSub(list){return list.length>1?"Ведут вместе":SP[list[0]].s}

var TYPES={
  inmode:{grp:"InMode",forw:"Для врачей, которые хотят начать работать на InMode или уже работают, но не уверены в параметрах. Уходите с поставленной рукой и протоколами, которые можно применять на следующий день.",
    learn:["как подбирать глубину и энергию под тип кожи и зону","как сочетать Morpheus8 и Lumecca и в каком порядке","как подготовить пациента и вести его после процедуры","что делать, если реакция пошла не по плану"],
    model:[["Lumecca","7 500 ₽"],["Morpheus8, лицо","23 000 ₽"],["Morpheus8, тело","26 000 ₽"]],nomodel:"10 000 ₽"},
  volint:{grp:"Volnewmer",forw:"Новый аппарат монополярного RF-лифтинга в парке ПИМС. Покажем, как начать работать на Volnewmer через аренду — без покупки аппарата. Интенсив — несколько встреч: теория, практика и индивидуальная постановка руки.",
    learn:["возможности аппарата и протоколы","результаты пациентов","экономику процедуры"],
    model:[["Работа спикера","5 000 ₽"],["Импульс, не менее 200","95 ₽"],["Электрод","800 ₽"]],nomodel:"10 000 ₽"},
  vol:{grp:"Volnewmer",forw:"Монополярный RF-лифтинг лица и тела на новом аппарате в парке ПИМС — от показаний и подбора пациента до работы на своей модели.",sample:true,
    learn:["показания, противопоказания и подбор пациента","протоколы для лица и тела","подбор импульсов и электродов","ведение пациента после процедуры"],
    model:[["Работа спикера","5 000 ₽"],["Импульс, не менее 200","95 ₽"],["Электрод","800 ₽"]],nomodel:"10 000 ₽"},
  smas:{grp:"SMAS",forw:"SMAS-лифтинг лица и тела на трёх аппаратах: Ultraformer III, Ultraformer MPT и BeeLift. Разберём, чем они отличаются и какой выбрать под задачу.",sample:true,
    learn:["показания, противопоказания и подбор пациента","насадки и глубина под зону","чем отличаются Ultraformer III, MPT и BeeLift","ведение пациента после процедуры"],
    model:[["Ultraformer III","5 000 ₽ + 25 ₽ за линию"],["Ultraformer MPT","5 000 ₽ + 40 ₽ за линию"],["BeeLift","5 000 ₽ + 14 ₽ за линию"]],nomodel:"10 000 ₽"},
  inj:{grp:"Инъекции",pre:true,forw:"Мастер-класс по препаратам: протоколы, сочетания и практика на моделях. Проходит под закупку препарата.",sample:true,
    learn:["показания и подбор пациента","техники введения","сочетание с аппаратными процедурами","ведение пациента после процедуры"],buy:"Под закупку препарата"},
  thr:{grp:"Нити",forw:"Нитевой лифтинг на нитях Gruzdev Trend и методика Triple face lift. Для врача участие — при закупке двух упаковок нитей GT.",sample:true,
    rows:[["Для врача","0 ₽<small>при закупке нитей</small>","Условие участия — закупка двух упаковок нитей Gruzdev Trend (GT)."],["Модель","нити GT + 6 000 ₽","Себестоимость нитей GT и 6 000 ₽ за расходники."],["Показательная модель","нити GT + 21 000 ₽","Себестоимость нитей GT, 6 000 ₽ за расходники и 15 000 ₽."],["Triple face lift для модели","170 000 ₽","Методика Triple face lift."]],
    learn:["выбор нитей под задачу","разметка и техника установки","сочетание с SMAS и RF","ведение пациента после процедуры"],buy:"При покупке двух упаковок нитей Gruzdev Trend обучение — в подарок"},
  ind:{grp:"Volnewmer",forw:"Один на один со спикером и вашей моделью — в спокойном темпе, без группы.",sample:true,
    learn:["разбор ваших задач и пациентов","подбор параметров под вашу модель","техника работы на всех зонах"],solo:"10 000 ₽ + 95 ₽ за импульс"}
};
var MK=[
  {d:3,m:"ноя",w:"вт",t:"Morpheus8 + Lumecca",p:"Игольчатый RF-лифтинг и фотоомоложение",f:"Теория и практика",sp:["kolke"],type:"inmode",cat:"inmode"},
  {d:6,m:"ноя",w:"пт",t:"Volnewmer",p:"Монополярный RF-лифтинг лица и тела",f:"Теория и практика",tag:"Новинка",sp:["ponomareva"],type:"vol",cat:"vol"},
  {d:12,m:"ноя",w:"чт",t:"Полимолочная кислота и пилинг Exo-Clarity",p:"Коллагеностимуляция и пилинг с ПДРН и экзосомами",f:"Под закупку препарата",n:"Полимолочная кислота и пилинг Exo-Clarity System",sp:["anganova"],type:"inj",cat:"inj"},
  {d:13,m:"ноя",w:"пт",t:"Ultraformer III и BeeLift",p:"SMAS-лифтинг лица и тела",f:"Теория и практика",n:"SMAS-лифтинг: Ultraformer III и BeeLift",sp:["ponomareva"],type:"smas",cat:"smas"},
  {d:17,m:"ноя",w:"вт",t:"Нитевой лифтинг",p:"Нити Gruzdev Trend и методика Triple face lift",f:"Под закупку нитей",n:"Нитевой лифтинг: нити Gruzdev Trend и Triple face lift",sp:["abaev"],type:"thr",cat:"inj"},
  {d:19,m:"ноя",w:"чт",t:"Volnewmer",p:"Индивидуальная постановка руки со спикером",f:"Постановка руки",tag:"Новинка",n:"Индивидуальная постановка руки: Volnewmer",ps:"Монополярный RF-лифтинг — один на один со спикером",sp:["kolke"],type:"ind",cat:"vol"},
  {d:23,m:"ноя",w:"пн",t:"Morpheus8 + Lumecca",p:"Игольчатый RF-лифтинг и фотоомоложение",f:"Теория и практика",sp:["ponomareva"],type:"inmode",cat:"inmode"},
  {d:30,m:"ноя",w:"пн",t:"Volnewmer",p:"Интенсив: протоколы, практика и экономика процедуры",f:"Интенсив",tag:"Новинка",n:"Интенсив по Volnewmer",ps:"Протоколы, практика на моделях и экономика процедуры",sp:["kolke"],type:"volint",cat:"vol"},
  {d:4,m:"окт",w:"вс",t:"Morpheus8 + Lumecca",p:"Индивидуальная постановка руки со спикером",f:"Постановка руки",n:"Индивидуальная постановка руки: Morpheus8 + Lumecca",ps:"Игольчатый RF-лифтинг и фотоомоложение — один на один со спикером",sp:["kuzovleva"],type:"indm",cat:"inmode"},
  {d:6,m:"окт",w:"вт",t:"Morpheus8 + Lumecca",p:"Игольчатый RF-лифтинг и фотоомоложение",f:"Теория и практика",sp:["kolke"],type:"inmode",cat:"inmode"},
  {d:8,m:"окт",w:"чт",t:"Volnewmer",p:"Монополярный RF-лифтинг лица и тела",f:"Теория и практика",sp:["ponomareva"],type:"vol",cat:"vol"},
  {d:12,m:"окт",w:"пн",t:"Juvelook и Lenisna",p:"Инъекционные коллагеностимуляторы",q:"описание уточнить",f:"Под закупку препарата",sp:["svyatogor"],type:"inj",cat:"inj"},
  {d:15,m:"окт",w:"чт",t:"Нити Gruzdev Trend",p:"Экспертный курс по нитевому лифтингу",f:"Под закупку нитей",n:"Экспертный курс по нитям Gruzdev Trend",sp:["kodyakov"],type:"gt",cat:"inj"},
  {d:22,m:"окт",w:"чт",t:"Volnewmer",p:"Монополярный RF-лифтинг лица и тела",f:"Теория и практика",sp:["kolke"],type:"vol",cat:"vol"},
  {d:27,m:"окт",w:"вт",t:"Morpheus8 + Lumecca",p:"Игольчатый RF-лифтинг и фотоомоложение",f:"Теория и практика",sp:["ponomareva"],type:"inmode",cat:"inmode"}
];
var MN={"окт":"10","ноя":"11"},WD={"пн":"понедельник","вт":"вторник","ср":"среда","чт":"четверг","пт":"пятница","сб":"суббота","вс":"воскресенье"};
var MF={"окт":"октября","ноя":"ноября"};
TYPES.indm=Object.assign({},TYPES.ind,{grp:"InMode",solo:"по запросу"});
TYPES.gt=Object.assign({},TYPES.thr,{forw:"Экспертный курс по нитям Gruzdev Trend. Проходит под закупку.",rows:null});
/* прошедшие: в прототипе «сегодня» — 1 ноября; на сайте — текущая дата */
var TODAY=new Date(2026,10,1);
MK.forEach(function(x,i){x.i=i;x.dt=new Date(2026,+MN[x.m]-1,x.d);x.past=x.dt<TODAY});
var UP=MK.filter(function(x){return !x.past}).sort(function(a,b){return a.dt-b.dt});
var PAST=MK.filter(function(x){return x.past}).sort(function(a,b){return b.dt-a.dt});


function tgIcons(root){$$('a.btn[href^="https://t.me"]',root||document).forEach(function(a){if(!a.querySelector("svg"))a.insertAdjacentHTML("afterbegin",'<svg aria-hidden="true"><use href="#i-tg"/></svg>')})}
function tgText(x){return TG+"?text="+encodeURIComponent("Здравствуйте! Хочу записаться на мастер-класс «"+(x.n||x.t)+"» "+x.d+" "+MF[x.m]+".")}
function remText(x){return TG+"?text="+encodeURIComponent("Здравствуйте! Хочу на следующий мастер-класс «"+(x.n||x.t)+"». Напишите, пожалуйста, когда будет дата.")}

function tags(x,dark){var h='<span class="chip '+(dark?"chip-ink":"chip-grey")+'">'+x.f+'</span>';if(x.tag)h+='<span class="chip chip-line">'+x.tag+'</span>';return h}

var SPIMG={ponomareva:"sp-pono",kolke:"sp-kolke",kuzovleva:"sp-kuz2",bendlin:"sp-bend",filatova:"sp-filat"};
avs=function(list){return '<span class="avs">'+list.map(function(k){return SPIMG[k]?'<img class="ava" src="media/'+SPIMG[k]+'.jpg" alt="">':'<span class="ava">'+ini(SP[k].n)+'</span>'}).join("")+'</span>'};
var GAL={inmode:[["","Практика на Morpheus8","mkc-inmode3.jpg"],["","Теория со спикером","bt-theory.jpg"],["","Практика на модели","bt-practice2.jpg"],["","Группа врачей","gl-group2.jpg"]],
 vol:[["","Volnewmer","mkc-vol3.jpg"],["","Теория со спикером","bt-theory.jpg"],["","Практика на модели","st-learn.jpg"]],
 smas:[["","SMAS-лифтинг","mkc-smas.jpg"],["","Теория со спикером","bt-theory.jpg"]],
 inj:[["","Препараты","mkc-prep2.jpg"],["","Теория со спикером","bt-theory.jpg"]]};
GAL.volint=GAL.vol;GAL.ind=GAL.vol;GAL.indm=GAL.inmode;GAL.thr=GAL.inj;GAL.gt=GAL.inj;
var MEDIA=GAL.inmode,mI=0;
function mediaGo(i){mI=(i+MEDIA.length)%MEDIA.length;var m=MEDIA[mI];var main=$("#mkL .mk-main");$("img",main).src="media/"+m[2];$("span",main).textContent=m[1];$("#mkL .mk-nav b").textContent=(mI+1)+" / "+MEDIA.length;$$("#mkL .mk-th button").forEach(function(b,k){b.classList.toggle("on",k===mI)})}
var WDF=WD,WDS={"пн":"пн","вт":"вт","ср":"ср","чт":"чт","пт":"пт","сб":"сб","вс":"вс"};
var M=document.createElement("div");M.className="mdl";M.id="mkModal";M.hidden=true;M.setAttribute("role","dialog");M.setAttribute("aria-modal","true");M.setAttribute("aria-labelledby","mkTitle");
M.innerHTML='<div class="mk-p"><button class="mdl-x" data-x aria-label="Закрыть">×</button><div class="mk-l" id="mkL"></div><div class="mk-r"><div class="mk-sc" id="mkSc"><div class="mk-hd" id="mkHd"></div><div class="mk-bd" id="mkBd"></div></div></div><div class="mk-act dw-cta mk-bar" id="mkAct"></div></div>';
document.body.appendChild(M);
M.addEventListener("click",function(e){if(e.target===M||e.target.closest("[data-x]"))closeModal(M)});
function openMK(i){
  var x=MK[i],T=TYPES[x.type];
  /* left: media of this topic */
  MEDIA=(GAL[x.type]||GAL.inmode);var mc=MEDIA.length;
  $("#mkL").classList.toggle("one",mc<2);
  $("#mkL").innerHTML='<div class="phd mk-main has-v"><img class="vimg" alt=""><span></span><div class="mk-nav"><b></b><button data-m="-1" aria-label="Назад">‹</button><button data-m="1" aria-label="Дальше">›</button></div></div>'+
    '<div class="mk-th">'+MEDIA.map(function(m,k){return '<button data-mi="'+k+'" aria-label="'+m[1]+'"><img src="media/'+m[2]+'" alt=""></button>'}).join("")+'</div>';
  mediaGo(0);
  /* head */
  $("#mkHd").innerHTML='<div class="tg">'+(x.past?'<span class="chip chip-line">Прошёл</span>':'')+tags(x,true)+'</div><h3 id="mkTitle">'+esc(x.n||x.t)+'</h3><p class="mk-lead">'+(x.lead||(T.pre?x.p+". "+T.forw:T.forw))+(x.q?'<span class="pm">'+x.q+'</span>':'')+'</p>'+
    '<div class="mk-mt mk-dt"><b>'+x.d+' '+MF[x.m]+', '+WDS[x.w]+' · 10:00</b></div>';
  /* price */
  var pr;
  if(T.model){pr='<div class="row"><div class="top"><b>С вашей моделью</b><span>0 ₽</span></div><p>Модель платит только за свою процедуру:</p><ul>'+T.model.map(function(r){return '<li><span>'+r[0]+'</span><span>'+r[1]+'</span></li>'}).join("")+'</ul></div>'+
    '<div class="row"><div class="top"><b>Без модели</b><span>'+T.nomodel+'</span></div><p>Слушаете теорию и смотрите, как коллеги работают со своими моделями.<span class="pm">можно ли руками?</span></p></div>'+
    '<p class="note">Модель — ваш пациент или знакомый: на нём вы делаете процедуру под контролем спикера. У каждого врача на практике свой час и своя модель.</p>'}
  else if(T.rows){pr=T.rows.map(function(r){return '<div class="row"><div class="top"><b>'+r[0]+'</b><span>'+r[1]+'</span></div>'+(r[2]?'<p>'+r[2]+'</p>':'')+'</div>'}).join("")}
  else if(T.solo){pr='<div class="row"><div class="top"><b>Постановка руки</b><span>'+T.solo+'</span></div><p>Один на один со спикером и вашей моделью.<span class="pm">цену уточнить</span></p></div>'}
  else{pr='<div class="row"><div class="top"><b>'+(x.f||"Под закупку")+'</b><span>0 ₽</span></div><p>Участие без оплаты — при закупке '+(/нит/.test(x.f)?'нитей':'препарата')+' у ПИМС. '+(/Под закупку/.test(T.buy)?'Объём закупки подскажет менеджер.':T.buy+'.')+'<span class="pm">условия по теме — уточнить</span></p></div>'}
  var dayH=T.solo?'<p>Время согласуете с менеджером. Спикер работает только с вами и вашей моделью — без группы, в спокойном темпе.<span class="pm">уточнить</span></p>':'<ol class="tl"><li><b>10:00–13:00</b><span>Теория — все врачи вместе со спикером: технология, показания и противопоказания, параметры, разбор случаев.</span></li><li><b>13:00</b><span>Кофе и лёгкий обед.</span></li><li><b>13:30–21:00</b><span>Практика. У каждого врача свой час и своя модель, спикер рядом и подсказывает параметры и технику. Врачи без модели смотрят и задают вопросы.</span></li></ol>';
  var modelH='<p>Напишите менеджеру, кого приведёте и на какую процедуру, — он подберёт вам час на практике. Модель приходит к своему времени.<span class="pm">помогаете ли найти модель?</span></p>';
  var preH='<p>Закрепляет за вами место и время для модели. На следующий день менеджер свяжется и уточнит детали.<span class="pm">засчитывается ли в оплату, возврат при отмене</span></p>';
  var bringH='<p>Медицинский костюм и сменную обувь.<span class="pm">уточнить</span></p>';
  var resH='<div class="mk-res"><div><span class="ill-t"><svg class="ico2" viewBox="0 0 32 32" aria-hidden="true"><rect x="5" y="4" width="18" height="23" rx="3" fill="#FF0500"/><rect x="9" y="9" width="10" height="2.2" rx="1.1" fill="#fff"/><rect x="9" y="13.5" width="7" height="2.2" rx="1.1" fill="#fff" opacity=".7"/><circle cx="22.5" cy="21" r="6.5" fill="#DCFF73" stroke="#fff" stroke-width="2"/><path d="m19.6 21 2 2 3.6-3.8" fill="none" stroke="#1C1919" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><p><b>Сертификат ПИМС<span class="pm">уточнить</span></b><span class="s">о прохождении мастер‑класса</span></p></div><div><span class="ill-t ill-tg"><svg class="ico2" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13" fill="#1C1919"/><path d="M22.6 10.2 8.9 15.5c-.9.4-.9 1 0 1.2l3.5 1.1 1.3 4.2c.2.5.4.6.8.6.3 0 .5-.1.7-.3l1.8-1.7 3.6 2.7c.7.4 1.1.2 1.3-.6l2.4-11.3c.3-1-.3-1.4-1.1-1.2zm-9.7 7.3 7.4-4.7c.4-.2.7-.1.4.2l-6.2 5.6-.3 2.6z" fill="#fff"/></svg></span><p><b>Чат врачей со спикерами</b><span class="s">вопросы спикерам после обучения</span></p></div></div>';
  var progH='<div class="mk-sec"><h4>Что разберём'+(T.sample?'<span class="pm">пример</span>':'')+'</h4><ul class="lst">'+T.learn.map(function(l){return "<li>"+l+"</li>"}).join("")+'</ul></div><div class="mk-sec"><h4>Что получите</h4>'+resH+'</div>';
  var sec=function(h,c){return '<div class="mk-sec"><h4>'+h+'</h4>'+c+'</div>'};
  var prepay=x.past?'':'<div class="row row-pre"><div class="top"><b>Предоплата при записи</b><span>5 000 ₽</span></div><p>Вносит врач, а не модель, — она бронирует за вами место на мастер-классе. На следующий день менеджер свяжется и уточнит детали.<span class="pm">кто платит и куда засчитывается — уточнить</span></p></div>';
  var priceH='<div class="mk-pr">'+pr.replace('<p class="note">',prepay+'<p class="note">')+(pr.indexOf('<p class="note">')<0?prepay:'')+'</div>';
  var stepsH='<ol class="steps"><li><span>Напишите менеджеру в Telegram, на какой мастер-класс и дату хотите.</span></li><li><span>Скажите, придёте ли с моделью и на какую процедуру, — менеджер подберёт вам час на практике. Модель приходит к своему времени.<span class="pm">помогаете ли найти модель?</span></span></li><li><span>Внесите предоплату 5 000 ₽ — она забронирует за вами место.<span class="pm">с моделью тоже?</span> На следующий день менеджер свяжется и уточнит детали.</span></li></ol>';
  if(st.mw!=="scroll"){
    var TB=[["prog","Программа",progH],["price","Стоимость",priceH],["day","Как проходит",sec(T.solo?"Как проходит":"Расписание дня",dayH)+sec("Что взять с собой",bringH)],["rec","Как записаться",stepsH]];
    $("#mkBd").className="mk-bd mk-tb";
    $("#mkBd").innerHTML='<div class="mk-tabs" role="tablist">'+TB.map(function(t,k){return '<button role="tab" data-t="'+t[0]+'"'+(k===0?' class="on"':'')+'>'+t[1]+'</button>'}).join("")+'</div>'+
      TB.map(function(t,k){return '<div class="mk-pane" data-p="'+t[0]+'"'+(k===0?'':' hidden')+'>'+t[2]+'</div>'}).join("");
  }else{
    var ACC=[["Как проходит день",dayH],["Как записаться",stepsH],["Что взять с собой",bringH]];
    $("#mkBd").className="mk-bd";
    $("#mkBd").innerHTML=progH+sec("Стоимость",priceH)+
      '<div class="acc mk-acc">'+ACC.map(function(a){return '<details><summary>'+a[0]+'</summary><div class="a">'+a[1]+'</div></details>'}).join("")+'</div>';
  }
  $("#mkAct").innerHTML='<div class="dw-iv mk-mgr"><img src="media/av-marina.jpg" alt="Марина"><div><b>Марина, менеджер ПИМС</b><span>'+(x.past?'напомнит, когда тема снова будет в расписании':'запишет вас на мастер-класс')+'</span></div></div><div class="dw-cta-b">'+(x.past
    ?'<a class="btn btn-red" href="'+remText(x)+'" target="_blank" rel="noopener">Напомнить о следующей дате</a>'
    :'<a class="btn btn-red" href="'+tgText(x)+'" target="_blank" rel="noopener">Записаться</a>')+'<a class="btn btn-out" href="tel:+79811707828"><svg class="ic" aria-hidden="true"><use href="#i-phone"/></svg>Позвонить</a>'+(x.past?'':'<button class="btn btn-out" data-call>Внести предоплату</button>')+'</div>';
  typo($("#mkModal"));tgIcons($("#mkModal"));$$("#mkModal .mk-pr .top span").forEach(function(s){s.classList.toggle("lg",s.textContent.replace(/\s/g,"").length>9)});
  openModal($("#mkModal"));
  $("#mkSc").scrollTop=0;$(".mk-p",$("#mkModal")).scrollTop=0;
}

$("#mkBd").addEventListener("click",function(e){var b=e.target.closest(".mk-tabs button");if(!b)return;$$("#mkBd .mk-tabs button").forEach(function(x){x.classList.toggle("on",x===b)});$$("#mkBd .mk-pane").forEach(function(p){p.hidden=p.dataset.p!==b.dataset.t});var sc=$("#mkSc"),tb=$("#mkBd .mk-tabs");if(tb.getBoundingClientRect().top<sc.getBoundingClientRect().top+2)sc.scrollTop=tb.offsetTop-sc.offsetTop});
$("#mkL").addEventListener("click",function(e){var b=e.target.closest("[data-m]");if(b){mediaGo(mI+ +b.dataset.m);return}var t=e.target.closest("[data-mi]");if(t)mediaGo(+t.dataset.mi)});
/* карточка расписания дизайна → мастер-класс прототипа по дате */
var NM={10:"окт",11:"ноя"};
window.openProtoMK=function(d,m){var x=MK.filter(function(y){return y.d===d&&y.m===NM[m]})[0];if(x)openMK(x.i)};
})();

document.addEventListener("click",function(e){var b=e.target.closest("[data-mkd]");if(b){e.preventDefault();window.openProtoMK(+b.dataset.mkd,+b.dataset.mkmo)}});
