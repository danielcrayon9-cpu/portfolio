// ===== State =====
let projects = [
    { year: 2025, title: "부동산통계정보시스템(R-ONE) 고도화", client: "한국부동산원" },
    { year: 2025, title: "한국부동산테크 홈페이지 고도화", client: "한국부동산원" },
    { year: 2024, title: "국립중앙의료원 아이안심톡", client: "국립중앙의료원" },
    { year: 2024, title: "탄자니아(잔지바르) 통계 DB서비스 시스템 구축", client: "정보통신부" },
    { year: 2023, title: "소프트웨어 통계 시스템", client: "과학기술정보통신부" },
    { year: 2023, title: "대한민국국회 국/영문 홈페이지, 모바일앱", client: "국회사무처" },
    { year: 2023, title: "국회 의안정보시스템", client: "국회사무처" },
    { year: 2023, title: "국회 의안정보시스템", client: "" },
    { year: 2022, title: "국회 의안정보시스템22", client: "" },
    { year: 2022, title: "국회 의안정보시스템22", client: "" },
    { year: 2022, title: "국회 의안정보시스템22", client: "" },
    { year: 2022, title: "국회 의안정보시스템22", client: "" },
];

let editingIndex = -1;
let currentDisplayedYear = null;
let lastScrollTop = 0;

// ===== DOM =====
const projectForm = document.getElementById('projectForm');
const submitBtn = document.getElementById('submitBtn');
const projectList = document.getElementById('projectList');
const yearRoller = document.getElementById('yearRoller');
const viewerRight = document.getElementById('viewerRight');
const previewPanel = document.getElementById('previewPanel');
const exportBtn = document.getElementById('exportBtn');
const gasUrlInput = document.getElementById('gasUrl');
const saveToSheetBtn = document.getElementById('saveToSheetBtn');
const loadFromSheetBtn = document.getElementById('loadFromSheetBtn');
const gasStatus = document.getElementById('gasStatus');

// ===== Init =====
function init() {
    const savedUrl = localStorage.getItem('scroll_gas_url');
    if (!gasUrlInput.value && savedUrl) gasUrlInput.value = savedUrl;

    renderAdminList();
    renderViewer();

    previewPanel.addEventListener('scroll', handleScroll, { passive: true });
}

// ===== Admin List =====
function renderAdminList() {
    projectList.innerHTML = '';
    const sorted = projects.map((p, i) => ({ ...p, _idx: i }))
        .sort((a, b) => b.year - a.year);

    sorted.forEach(p => {
        const idx = p._idx;
        const item = document.createElement('div');
        item.className = 'project-item';

        const span = document.createElement('span');
        span.innerHTML = `<strong>${p.year}</strong> ${p.title}${p.client ? ' <em style="color:#999;font-size:0.65rem">(' + p.client + ')</em>' : ''}`;

        const btnWrap = document.createElement('div');
        btnWrap.style.cssText = 'display:flex;gap:0.3rem;flex-shrink:0;';

        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'btn-action btn-edit';
        editBtn.textContent = '수정';
        editBtn.addEventListener('click', () => startEdit(idx));

        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = 'btn-action btn-del';
        delBtn.textContent = '삭제';
        delBtn.addEventListener('click', () => deleteProject(idx));

        btnWrap.appendChild(editBtn);
        btnWrap.appendChild(delBtn);
        item.appendChild(span);
        item.appendChild(btnWrap);
        projectList.appendChild(item);
    });
}

// ===== Viewer Rendering =====
function renderViewer() {
    viewerRight.innerHTML = '';
    currentDisplayedYear = null;

    if (projects.length === 0) {
        viewerRight.innerHTML = '<div class="empty-state">프로젝트를 추가해 주세요.</div>';
        yearRoller.innerHTML = '';
        return;
    }

    const sorted = [...projects].sort((a, b) => b.year - a.year);
    let currentYear = null;
    let indexInYear = 0;

    sorted.forEach(p => {
        if (parseInt(p.year) !== currentYear) {
            currentYear = parseInt(p.year);
            indexInYear = 0;
            const label = document.createElement('div');
            label.className = 'year-group-label';
            label.textContent = currentYear;
            label.dataset.year = currentYear;
            viewerRight.appendChild(label);
        }

        indexInYear++;

        const item = document.createElement('div');
        item.className = 'viewer-item';
        item.dataset.year = currentYear;

        const idx = document.createElement('span');
        idx.className = 'item-index';
        idx.textContent = String(indexInYear).padStart(2, '0');

        const contentWrap = document.createElement('div');
        contentWrap.className = 'item-content';

        const title = document.createElement('span');
        title.className = 'item-title';
        title.textContent = p.title;
        contentWrap.appendChild(title);

        if (p.client) {
            const client = document.createElement('span');
            client.className = 'item-client';
            client.textContent = p.client;
            contentWrap.appendChild(client);
        }

        item.appendChild(idx);
        item.appendChild(contentWrap);
        viewerRight.appendChild(item);
    });

    // Trigger initial scroll to set year
    requestAnimationFrame(() => handleScroll());
}

// ===== Scroll Handling =====
function handleScroll() {
    const panelRect = previewPanel.getBoundingClientRect();
    const fadeZone = panelRect.height * 0.18;

    // 1) Fade items near top & bottom
    const items = viewerRight.querySelectorAll('.viewer-item');
    const bottomFadeStart = panelRect.height - fadeZone;
    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const relTop = rect.top - panelRect.top;
        const relBottom = rect.bottom - panelRect.top;
        if (relTop < fadeZone && relTop > -rect.height) {
            const progress = Math.max(0, relTop / fadeZone);
            item.style.opacity = progress;
            item.style.transform = `translateY(${(1 - progress) * -12}px)`;
        } else if (relTop <= -rect.height) {
            item.style.opacity = 0;
            item.style.transform = 'translateY(-12px)';
        } else if (relTop > bottomFadeStart) {
            const progress = Math.max(0, (panelRect.height - relTop) / fadeZone);
            item.style.opacity = progress;
            item.style.transform = `translateY(${(1 - progress) * 12}px)`;
        } else {
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        }
    });

    // 2) Fade year group labels (top & bottom)
    const labels = viewerRight.querySelectorAll('.year-group-label');
    labels.forEach(label => {
        const rect = label.getBoundingClientRect();
        const relTop = rect.top - panelRect.top;
        if (relTop < fadeZone && relTop > -rect.height) {
            label.style.opacity = Math.max(0, relTop / fadeZone);
        } else if (relTop <= -rect.height) {
            label.style.opacity = 0;
        } else if (relTop > bottomFadeStart) {
            label.style.opacity = Math.max(0, (panelRect.height - relTop) / fadeZone);
        } else {
            label.style.opacity = 1;
        }
    });

    // 3) Year detection: 라벨+항목 모두 포함, DOM순서대로 첫 번째 보이는 요소의 연도
    let activeYear = null;
    const yearLabels = viewerRight.querySelectorAll('.year-group-label');
    yearLabels.forEach(label => {
        const rect = label.getBoundingClientRect();
        const relTop = rect.top - panelRect.top;
        if (relTop < panelRect.height * 0.5) {
            activeYear = parseInt(label.dataset.year);
        }
    });
    if (activeYear === null && yearLabels.length > 0) {
        activeYear = parseInt(yearLabels[0].dataset.year);
    }

    if (activeYear !== null) updateYearDisplay(activeYear);
}

// ===== Year Roller Animation =====
function updateYearDisplay(year) {
    if (year === currentDisplayedYear) return;
    const direction = currentDisplayedYear !== null && year < currentDisplayedYear ? 'up' : 'down';
    currentDisplayedYear = year;

    // Clean up stale elements from rapid scrolling
    const existing = yearRoller.querySelectorAll('.year-text');
    if (existing.length > 1) {
        for (let i = 0; i < existing.length - 1; i++) existing[i].remove();
    }

    const oldText = yearRoller.querySelector('.year-text');
    const newText = document.createElement('span');
    newText.className = 'year-text';
    newText.textContent = year;

    if (!oldText) {
        yearRoller.appendChild(newText);
        return;
    }

    // Position new text off-screen
    const inFrom = direction === 'up' ? '110%' : '-110%';
    newText.style.transform = `translateY(${inFrom})`;
    newText.style.opacity = '0';
    yearRoller.appendChild(newText);

    // Animate
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const exitTo = direction === 'up' ? '-110%' : '110%';
            oldText.style.transform = `translateY(${exitTo})`;
            oldText.style.opacity = '0';
            newText.style.transform = 'translateY(0)';
            newText.style.opacity = '1';
        });
    });

    setTimeout(() => { if (oldText.parentNode) oldText.remove(); }, 700);
}

// ===== Edit / Delete =====
function startEdit(index) {
    editingIndex = index;
    const p = projects[index];
    document.getElementById('year').value = p.year;
    document.getElementById('title').value = p.title;
    document.getElementById('client').value = p.client || '';
    submitBtn.textContent = '변경사항 저장';
    submitBtn.style.backgroundColor = '#1565c0';
}

function deleteProject(index) {
    if (editingIndex === index) cancelEdit();
    projects.splice(index, 1);
    renderAdminList();
    renderViewer();
}

function cancelEdit() {
    editingIndex = -1;
    projectForm.reset();
    submitBtn.textContent = '데이터 추가';
    submitBtn.style.backgroundColor = 'var(--accent)';
}

projectForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
        year: parseInt(document.getElementById('year').value),
        title: document.getElementById('title').value,
        client: document.getElementById('client').value.trim()
    };

    if (editingIndex > -1) {
        projects[editingIndex] = data;
        cancelEdit();
    } else {
        projects.push(data);
        projectForm.reset();
    }

    renderAdminList();
    renderViewer();
});

// ===== Export =====
exportBtn.addEventListener('click', () => {
    const dataStr = JSON.stringify(projects);
    const scriptEnd = '<' + '/script>';
    const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Portfolio</title>
<link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
<style>
:root{--bg:#F9F9F8;--text:#111;--dim:#aaa;--light:#ccc;--border:rgba(0,0,0,0.04);--font:'Pretendard',-apple-system,BlinkMacSystemFont,sans-serif}
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;background:var(--bg);color:var(--text);font-family:var(--font)}
body{overflow-y:auto}
body::-webkit-scrollbar{width:0}
.vc{display:flex;min-height:100%}
.vl{width:40%;position:sticky;top:0;height:100vh;display:flex;align-items:center;justify-content:flex-end;padding-right:4rem}
.yd{position:relative;height:10rem;display:flex;align-items:center;justify-content:flex-end;clip-path:inset(0 -200% 0 -200%)}
.yr{position:relative;width:100vw;height:100%;display:flex;align-items:center;justify-content:flex-end}
.yt{font-size:8rem;font-weight:900;line-height:1;color:var(--text);letter-spacing:-0.04em;position:absolute;right:0;transition:transform .6s cubic-bezier(.16,1,.3,1),opacity .4s ease}
.vr{width:60%;padding:50vh 4rem 50vh 0}
.ygl{font-size:.58rem;font-weight:600;color:var(--light);text-transform:uppercase;letter-spacing:.2em;padding:3rem 0 1rem 0}
.ygl:first-child{padding-top:0}
.vi{display:flex;align-items:baseline;gap:1.2rem;padding:1.5rem 0;border-bottom:1px solid var(--border);transition:opacity .3s ease,transform .3s ease;will-change:opacity,transform}
.vi:last-child{border-bottom:none}
.ii{font-size:.62rem;color:var(--dim);font-weight:500;min-width:1.5rem;font-variant-numeric:tabular-nums}
.it{font-size:1.3rem;font-weight:400;line-height:1.5;color:var(--text)}
.ic{display:flex;flex-direction:column;gap:0.4rem}
.icl{display:inline-block;font-size:.65rem;font-weight:500;color:#666;background:rgba(0,0,0,0.04);border:1px solid rgba(0,0,0,0.06);padding:.2rem .55rem;border-radius:100px;width:fit-content}
@media(max-width:768px){.vl{width:30%;padding-right:2rem}.yt{font-size:4.5rem}.vr{width:70%;padding-right:2rem}.it{font-size:1rem}}
</style>
</head>
<body>
<div class="vc">
<div class="vl"><div class="yd"><div class="yr" id="yr"></div></div></div>
<div class="vr" id="vr"></div>
</div>
<script>
var P=${dataStr};
var cY=null;
function render(){
var v=document.getElementById('vr');v.innerHTML='';
var s=P.slice().sort(function(a,b){return b.year-a.year});
var cy=null,ix=0;
s.forEach(function(p){
if(parseInt(p.year)!==cy){cy=parseInt(p.year);ix=0;
var l=document.createElement('div');l.className='ygl';l.textContent=cy;l.dataset.year=cy;v.appendChild(l)}
ix++;
var d=document.createElement('div');d.className='vi';d.dataset.year=cy;
var s1=document.createElement('span');s1.className='ii';s1.textContent=String(ix).padStart(2,'0');
var cw=document.createElement('div');cw.className='ic';
var s2=document.createElement('span');s2.className='it';s2.textContent=p.title;
cw.appendChild(s2);
if(p.client){var cl=document.createElement('span');cl.className='icl';cl.textContent=p.client;cw.appendChild(cl)}
d.appendChild(s1);d.appendChild(cw);v.appendChild(d)});
requestAnimationFrame(hS)}
function hS(){
var vh=window.innerHeight;var fz=vh*.18;var bfs=vh-fz;
var items=document.querySelectorAll('.vi');
items.forEach(function(el){var r=el.getBoundingClientRect();
if(r.top<fz&&r.top>-r.height){var pr=Math.max(0,r.top/fz);el.style.opacity=pr;el.style.transform='translateY('+(1-pr)*-12+'px)'}
else if(r.top<=-r.height){el.style.opacity=0}
else if(r.top>bfs){var pr=Math.max(0,(vh-r.top)/fz);el.style.opacity=pr;el.style.transform='translateY('+(1-pr)*12+'px)'}
else{el.style.opacity=1;el.style.transform='translateY(0)'}});
var labels=document.querySelectorAll('.ygl');
labels.forEach(function(l){var r=l.getBoundingClientRect();
if(r.top<fz&&r.top>-r.height){l.style.opacity=Math.max(0,r.top/fz)}
else if(r.top<=-r.height){l.style.opacity=0}
else if(r.top>bfs){l.style.opacity=Math.max(0,(vh-r.top)/fz)}
else{l.style.opacity=1}});
var ay=null;var gl=document.querySelectorAll('.ygl');
gl.forEach(function(l){var r=l.getBoundingClientRect();
if(r.top<vh*0.5){ay=parseInt(l.dataset.year)}});
if(ay===null&&gl.length>0){ay=parseInt(gl[0].dataset.year)}
if(ay!==null)uY(ay)}
function uY(y){if(y===cY)return;
var dir=cY!==null&&y<cY?'up':'down';cY=y;
var ro=document.getElementById('yr');
var ex=ro.querySelectorAll('.yt');
if(ex.length>1)for(var i=0;i<ex.length-1;i++)ex[i].remove();
var old=ro.querySelector('.yt');
var nw=document.createElement('span');nw.className='yt';nw.textContent=y;
if(!old){ro.appendChild(nw);return}
var inf=dir==='up'?'110%':'-110%';
nw.style.transform='translateY('+inf+')';nw.style.opacity='0';ro.appendChild(nw);
requestAnimationFrame(function(){requestAnimationFrame(function(){
var exf=dir==='up'?'-110%':'110%';
old.style.transform='translateY('+exf+')';old.style.opacity='0';
nw.style.transform='translateY(0)';nw.style.opacity='1'})});
setTimeout(function(){if(old.parentNode)old.remove()},700)}
window.addEventListener('scroll',hS,{passive:true});
render();
${scriptEnd}
</body>
</html>`;


    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// ===== Google Sheets Integration =====
function getGasUrl() {
    const url = gasUrlInput.value.trim();
    if (!url) {
        gasStatus.textContent = '⚠ GAS URL을 입력하세요.';
        gasStatus.style.color = '#c62828';
        return null;
    }
    localStorage.setItem('scroll_gas_url', url);
    return url;
}

saveToSheetBtn.addEventListener('click', async () => {
    const url = getGasUrl();
    if (!url) return;
    gasStatus.textContent = '저장 중...';
    gasStatus.style.color = '#999';
    saveToSheetBtn.disabled = true;
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: 'save', projects })
        });
        const data = await res.json();
        if (data.success) {
            gasStatus.textContent = `✅ ${data.savedCount}개 저장 완료`;
            gasStatus.style.color = '#2e7d32';
        } else {
            gasStatus.textContent = '❌ ' + data.error;
            gasStatus.style.color = '#c62828';
        }
    } catch (err) {
        gasStatus.textContent = '❌ ' + err.message;
        gasStatus.style.color = '#c62828';
    }
    saveToSheetBtn.disabled = false;
});

loadFromSheetBtn.addEventListener('click', async () => {
    const url = getGasUrl();
    if (!url) return;
    gasStatus.textContent = '불러오는 중...';
    gasStatus.style.color = '#999';
    loadFromSheetBtn.disabled = true;
    try {
        const res = await fetch(url + '?action=list');
        const data = await res.json();
        if (data.success) {
            if (data.projects.length === 0) {
                gasStatus.textContent = 'ℹ 저장된 데이터 없음';
                gasStatus.style.color = '#999';
            } else {
                projects = data.projects;
                renderAdminList();
                renderViewer();
                gasStatus.textContent = `✅ ${data.projects.length}개 불러옴`;
                gasStatus.style.color = '#1565c0';
            }
        } else {
            gasStatus.textContent = '❌ ' + data.error;
            gasStatus.style.color = '#c62828';
        }
    } catch (err) {
        gasStatus.textContent = '❌ ' + err.message;
        gasStatus.style.color = '#c62828';
    }
    loadFromSheetBtn.disabled = false;
});

// ===== Start =====
init();
