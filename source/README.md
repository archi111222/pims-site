# ПИМС — исходники дизайна в коде

Сайт в корне репозитория (index.html, master-klassy.html, arenda.html, kontakty.html, media, fonts) — **собранный результат**. Правки вносятся здесь, в `source/`, потом сайт пересобирается.

## Как устроено

- `design/glavnaya.src.html` — главная, она же основа для всех страниц (шапка, подвал, окна, общие скрипты).
- `design/ds.css` — дизайн-система (токены), `design/pims-ui.css` — общий слой правок для всех страниц.
- `gen/mk/make_mk.py` → `mk.src.html` («Мастер-классы»): берёт главную, скрывает лишние блоки, добавляет `hero.html`, `blocks.html`, `mk.css`, `mk.js`.
- `gen/ar/make_ar.py` → `arenda.src.html` («Аренда»): так же, плюс `ar.css`, `ar.js`; использует и `mk.css`.
- `gen/ct/make_ct.py` → `kontakty.src.html` («Контакты»): `hero.html`, `form.html`, `blocks.html`, `ct.css`, `ct.js`; CSS = mk + ar + ct.
- `design/build.py` вставляет ds.css и pims-ui.css → `*.html`.
- `design/build_site.py` собирает папку сайта: переименовывает страницы, ссылки claude.ai/artifact → относительные, логотип на внутренних страницах → index.html, копирует нужные media и fonts, добавляет заглушку для телефона (`site-stub.html`).

## Порядок сборки

Из корня репозитория:

```
python3 source/gen/mk/make_mk.py
python3 source/gen/ar/make_ar.py
python3 source/gen/ct/make_ct.py
python3 source/design/build.py
python3 source/design/build_site.py
```

Последний шаг сам кладёт 4 html, media и fonts в корень репозитория. Варианты: `build_site.py /tmp/out` — собрать в другую папку для проверки; `--local` — добавить serve.ps1 и запустить.bat для локального просмотра. Промежуточные файлы (`*.src.html` страниц, `design/*.html`) в git не попадают.

Пути в скриптах считаются от расположения самих скриптов, ничего менять не нужно. Файлы с суффиксами `-v01`, `-v44` и т. п. в `gen/` — архив прошлых версий, в сборке не участвуют.

При правке страницы поднимайте её версию в генераторе (`VER` в make_*.py, для главной — бейдж в glavnaya.src.html).

## Версии страниц

Главная v0.50 · Мастер-классы v0.49 · Аренда v0.9 · Контакты v0.3 (23 ноября 2026).

## Документы

`docs/` — правки дизайна (круг 1) и вопросы команде.
