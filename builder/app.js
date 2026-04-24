let projects = [
    { year: 2025, title: "부동산통계정보시스템(R-ONE) 고도화", description: "한국부동산에서 운영하며, 부동산통계정보를 제공", tech: "Figma, Photoshop, HTML, CSS, Response Web" },
    { year: 2025, title: "한국부동산테크 홈페이지 고도화", description: "전국의 공동주택 및 오피스텔 가격정보를 제공", tech: "Figma, Photoshop, HTML, CSS, Response Web" },
    { year: 2024, title: "국립중앙의료원 아이안심톡", description: "전문가(의사)와 직접 상담할 수 있는 서비스를 제공", tech: "Figma, Photoshop, HTML, CSS, Response Web" },
    { year: 2023, title: "", description: "", tech: "" }
];

let currentYearIndex = 0;
let uniqueYears = [];
let editingIndex = -1;

const projectForm = document.getElementById('projectForm');
const submitBtn = projectForm.querySelector('button[type="submit"]');
const projectList = document.getElementById('projectList');
const cardsContainer = document.getElementById('cardsContainer');
const bgYearText = document.getElementById('bgYearText');
const badgeYear = document.getElementById('badgeYear');
const badgeLabel = document.getElementById('badgeLabel');
const badgeCount = document.getElementById('badgeCount');
const centerBadge = document.getElementById('centerBadge');
const timelineTrack = document.getElementById('timelineTrack');
const exportBtn = document.getElementById('exportBtn');
const gasUrlInput = document.getElementById('gasUrl');
const saveToSheetBtn = document.getElementById('saveToSheetBtn');
const loadFromSheetBtn = document.getElementById('loadFromSheetBtn');
const gasStatus = document.getElementById('gasStatus');

const CARD_COLORS = ['#5B8DEF', '#EF6B5B', '#4FC4A1', '#F7B955', '#9B6EF3', '#E86B9E', '#5BC0DE', '#F0AD4E'];

function init() {
    // Restore GAS URL from localStorage
    //const savedGasUrl = localStorage.getItem('timeline_gas_url');
    //if (savedGasUrl) gasUrlInput.value = savedGasUrl;
    const savedGasUrl = localStorage.getItem('timeline_gas_url');
    if (!gasUrlInput.value && savedGasUrl) {
        gasUrlInput.value = savedGasUrl;
    }

    updateUniqueYears();
    renderAdminList();
    renderTimeline();
    renderPreview();

    // Mouse wheel to change year
    document.querySelector('.preview-panel').addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY > 0) {
            if (currentYearIndex < uniqueYears.length - 1) { currentYearIndex++; renderTimeline(); renderPreview(); }
        } else {
            if (currentYearIndex > 0) { currentYearIndex--; renderTimeline(); renderPreview(); }
        }
    }, { passive: false });
}

function updateUniqueYears() {
    uniqueYears = [...new Set(projects.map(p => parseInt(p.year)))].sort((a, b) => b - a);
    if (currentYearIndex >= uniqueYears.length) currentYearIndex = Math.max(0, uniqueYears.length - 1);
    if (uniqueYears.length === 0) {
        uniqueYears = [new Date().getFullYear()];
        currentYearIndex = 0;
    }
}

function renderAdminList() {
    projectList.innerHTML = '';
    const sorted = projects.map((p, i) => ({ ...p, _idx: i }))
        .sort((a, b) => b.year - a.year);
    sorted.forEach((p) => {
        const idx = p._idx;
        const item = document.createElement('div');
        item.className = 'project-item';

        const span = document.createElement('span');
        span.innerHTML = `<strong>${p.year}</strong> ${p.title}`;

        const btnWrap = document.createElement('div');
        btnWrap.style.cssText = 'display:flex;gap:0.4rem;';

        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'btn-delete';
        editBtn.style.color = '#4da6ff';
        editBtn.textContent = '수정';
        editBtn.addEventListener('click', () => { window.startEdit(idx); });

        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = 'btn-delete';
        delBtn.textContent = '삭제';
        delBtn.addEventListener('click', () => { window.deleteProject(idx); });

        btnWrap.appendChild(editBtn);
        btnWrap.appendChild(delBtn);
        item.appendChild(span);
        item.appendChild(btnWrap);
        projectList.appendChild(item);
    });
}

function renderTimeline() {
    timelineTrack.innerHTML = '';
    uniqueYears.slice().reverse().forEach((y, i) => {
        if (i > 0) {
            const dot = document.createElement('div');
            dot.className = 'timeline-dot-sep';
            timelineTrack.appendChild(dot);
        }
        const el = document.createElement('div');
        el.className = 'timeline-year' + (uniqueYears[currentYearIndex] === y ? ' active' : '');
        el.textContent = y;
        el.onclick = () => {
            currentYearIndex = uniqueYears.indexOf(y);
            renderTimeline();
            renderPreview();
        };
        timelineTrack.appendChild(el);
    });
}

// Radial card positions around center
function getCardPositions(count) {
    const positions = [];
    const cx = 50, cy = 45; // center %
    const radiusX = 32, radiusY = 28;
    const startAngle = -Math.PI / 2;
    for (let i = 0; i < count; i++) {
        const angle = startAngle + (2 * Math.PI * i / count);
        const jitterX = (Math.random() - 0.5) * 6;
        const jitterY = (Math.random() - 0.5) * 6;
        positions.push({
            left: cx + radiusX * Math.cos(angle) + jitterX,
            top: cy + radiusY * Math.sin(angle) + jitterY
        });
    }
    return positions;
}

function renderPreview() {
    if (uniqueYears.length === 0) return;
    const year = uniqueYears[currentYearIndex];
    const filtered = projects.filter(p => parseInt(p.year) === year);

    // Animate badge
    gsap.to(centerBadge, {
        scale: 0.8, opacity: 0, duration: 0.3, onComplete: () => {
            badgeYear.textContent = year;
            badgeCount.textContent = `${filtered.length} Projects`;
            gsap.to(centerBadge, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" });
        }
    });

    // Animate bg year text
    gsap.to(bgYearText, {
        opacity: 0, scale: 0.9, duration: 0.3, onComplete: () => {
            bgYearText.textContent = year;
            gsap.to(bgYearText, { opacity: 0.06, scale: 1, duration: 0.8, ease: "power2.out" });
        }
    });

    // Render cards
    cardsContainer.innerHTML = '';
    if (filtered.length === 0) return;

    const positions = getCardPositions(filtered.length);
    filtered.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.left = `calc(${positions[i].left}% - 115px)`;
        card.style.top = `calc(${positions[i].top}% - 60px)`;

        const techHtml = p.tech ? p.tech.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('') : '';
        card.innerHTML = `
            <div class="card-body">
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <div class="tech-tags">${techHtml}</div>
            </div>`;
        cardsContainer.appendChild(card);
    });

    gsap.fromTo(".project-card",
        { opacity: 0, scale: 0.7, y: 30 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "back.out(1.2)" }
    );
}

// Edit / Delete
window.startEdit = (index) => {
    editingIndex = index;
    const p = projects[index];
    document.getElementById('year').value = p.year;
    document.getElementById('title').value = p.title;
    document.getElementById('description').value = p.description;
    document.getElementById('tech').value = p.tech;
    submitBtn.textContent = "변경사항 저장";
    submitBtn.style.backgroundColor = "#4da6ff";
};

window.deleteProject = (index) => {
    if (editingIndex === index) cancelEdit();
    projects.splice(index, 1);
    updateUniqueYears();
    renderAdminList();
    renderTimeline();
    renderPreview();
};

function cancelEdit() {
    editingIndex = -1;
    projectForm.reset();
    submitBtn.textContent = "데이터 추가";
    submitBtn.style.backgroundColor = "var(--accent-color)";
}

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        year: parseInt(document.getElementById('year').value),
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        tech: document.getElementById('tech').value
    };
    if (editingIndex > -1) { projects[editingIndex] = data; cancelEdit(); }
    else { projects.push(data); projectForm.reset(); }

    updateUniqueYears();
    currentYearIndex = uniqueYears.indexOf(data.year);
    renderAdminList();
    renderTimeline();
    renderPreview();
});

// ===== Export =====
exportBtn.addEventListener('click', () => {
    const dataStr = JSON.stringify(projects);
    const cardColors = JSON.stringify(CARD_COLORS);
    const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My Portfolio Timeline</title>
<link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
<style>
:root{--bg:#f0efed;--accent:#222;--text:#222;--dim:#999;--font:'Pretendard',sans-serif}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:var(--font);height:100vh;overflow:hidden}
.bg-year-text{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:50vw;font-weight:900;line-height:1;color:rgba(0,0,0,0.05);pointer-events:none;user-select:none;z-index:0;white-space:nowrap}
.center-badge{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,rgba(80,80,80,0.85),rgba(50,50,50,0.75));display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:10;box-shadow:0 10px 50px rgba(0,0,0,0.12);border:1px solid rgba(255,255,255,0.15)}
.center-badge::before{content:'';position:absolute;top:-12px;left:-12px;right:-12px;bottom:-12px;border-radius:50%;border:1px dashed rgba(0,0,0,0.08)}
.badge-label{font-size:.7rem;font-weight:600;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:.15em;margin-bottom:.15rem}
.badge-year{font-size:3rem;font-weight:900;color:#fff;line-height:1;letter-spacing:-.02em}
.badge-count{font-size:.65rem;font-weight:500;color:rgba(255,255,255,0.5);margin-top:.25rem;letter-spacing:.05em}
.cards-container{position:fixed;top:0;left:0;right:0;bottom:50px;z-index:5;pointer-events:none}
.project-card{position:absolute;width:230px;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);border:1px solid rgba(0,0,0,0.06);pointer-events:auto;cursor:default;transition:transform .3s,box-shadow .3s;opacity:0}
.project-card:hover{transform:scale(1.05)!important;box-shadow:0 8px 35px rgba(0,0,0,0.14);z-index:20}
.card-body{padding:1rem 1.2rem}
.card-body h3{font-size:.95rem;font-weight:700;margin-bottom:.35rem;color:var(--accent);line-height:1.3}
.card-body p{font-size:.75rem;color:var(--dim);line-height:1.5;margin-bottom:.5rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.tech-tags{display:flex;flex-wrap:wrap;gap:.3rem}
.tag{font-size:.58rem;padding:.12rem .4rem;background:#f2f2f2;border-radius:3px;color:var(--dim);text-transform:uppercase;letter-spacing:.03em}
.timeline-bar{position:fixed;bottom:0;left:0;right:0;height:50px;background:rgba(0,0,0,0.06);backdrop-filter:blur(10px);z-index:100;display:flex;align-items:center;overflow-x:auto;padding:0 2rem}
.timeline-bar::-webkit-scrollbar{height:0}
.timeline-track{display:flex;align-items:center;min-width:100%;justify-content:center;height:100%;position:relative}
.timeline-year{padding:0 1.5rem;font-size:.8rem;font-weight:500;color:rgba(0,0,0,0.3);cursor:pointer;transition:all .3s;white-space:nowrap;height:100%;display:flex;align-items:center;position:relative}
.timeline-year::after{content:'';position:absolute;bottom:8px;left:50%;transform:translateX(-50%);width:3px;height:3px;border-radius:50%;background:rgba(0,0,0,0.15);transition:all .3s}
.timeline-year:hover{color:rgba(0,0,0,0.6)}
.timeline-year.active{font-weight:800;font-size:1rem;color:var(--accent)}
.timeline-year.active::after{width:6px;height:6px;background:var(--accent)}
.timeline-dot-sep{width:2px;height:2px;border-radius:50%;background:rgba(0,0,0,0.1);flex-shrink:0}
@media(max-width:768px){.center-badge{width:140px;height:140px}.badge-year{font-size:2.2rem}.project-card{width:170px}.bg-year-text{font-size:60vw}}
</style>
</head>
<body>
<div class="bg-year-text" id="bgYearText"></div>
<div class="center-badge" id="centerBadge">
    <div class="badge-label" id="badgeLabel">Portfolio</div>
    <div class="badge-year" id="badgeYear"></div>
    <div class="badge-count" id="badgeCount"></div>
</div>
<div id="cardsContainer" class="cards-container"></div>
<div class="timeline-bar"><div class="timeline-track" id="timelineTrack"></div></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"><\/script>
<script>
const projects=${dataStr};
let uniqueYears=[...new Set(projects.map(p=>parseInt(p.year)))].sort((a,b)=>b-a);
let ci=0;
function getPos(n){const p=[];const cx=50,cy=45,rx=32,ry=28,sa=-Math.PI/2;for(let i=0;i<n;i++){const a=sa+(2*Math.PI*i/n);const jx=(Math.random()-0.5)*6;const jy=(Math.random()-0.5)*6;p.push({l:cx+rx*Math.cos(a)+jx,t:cy+ry*Math.sin(a)+jy})}return p}
function renderTL(){const t=document.getElementById('timelineTrack');t.innerHTML='';uniqueYears.slice().reverse().forEach((y,i)=>{if(i>0){const d=document.createElement('div');d.className='timeline-dot-sep';t.appendChild(d)}const e=document.createElement('div');e.className='timeline-year'+(uniqueYears[ci]===y?' active':'');e.textContent=y;e.onclick=()=>{ci=uniqueYears.indexOf(y);render()};t.appendChild(e)})}
function render(){const year=uniqueYears[ci];const filtered=projects.filter(p=>parseInt(p.year)===year);
const badge=document.getElementById('centerBadge');
gsap.to(badge,{scale:.8,opacity:0,duration:.3,onComplete:()=>{document.getElementById('badgeYear').textContent=year;document.getElementById('badgeCount').textContent=filtered.length+' Projects';gsap.to(badge,{scale:1,opacity:1,duration:.6,ease:'back.out(1.5)'})}});
const bg=document.getElementById('bgYearText');gsap.to(bg,{opacity:0,scale:.9,duration:.3,onComplete:()=>{bg.textContent=year;gsap.to(bg,{opacity:.05,scale:1,duration:.8,ease:'power2.out'})}});
const c=document.getElementById('cardsContainer');c.innerHTML='';if(filtered.length===0){renderTL();return;}
const pos=getPos(filtered.length);filtered.forEach((p,i)=>{const card=document.createElement('div');card.className='project-card';card.style.left='calc('+pos[i].l+'% - 115px)';card.style.top='calc('+pos[i].t+'% - 60px)';const tech=p.tech?p.tech.split(',').map(t=>'<span class="tag">'+t.trim()+'</span>').join(''):'';card.innerHTML='<div class="card-body"><h3>'+p.title+'</h3><p>'+p.description+'</p><div class="tech-tags">'+tech+'</div></div>';c.appendChild(card)});
gsap.fromTo('.project-card',{opacity:0,scale:.7,y:30},{opacity:1,scale:1,y:0,stagger:.08,duration:.6,ease:'back.out(1.2)'});
renderTL()}
document.addEventListener('wheel',(e)=>{e.preventDefault();if(e.deltaY>0){if(ci<uniqueYears.length-1){ci++;render()}}else{if(ci>0){ci--;render()}}},{passive:false});
if(uniqueYears.length>0)render();
<\/script>
</body>
</html>`;


    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_timeline_portfolio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

init();

// ===== Google Sheets 연동 =====
function getGasUrl() {
    const url = gasUrlInput.value.trim();
    if (!url) {
        gasStatus.textContent = '⚠ GAS 웹앱 URL을 먼저 입력하세요.';
        gasStatus.style.color = '#d44';
        return null;
    }
    localStorage.setItem('timeline_gas_url', url);
    return url;
}

// 시트에 저장
saveToSheetBtn.addEventListener('click', async () => {
    const url = getGasUrl();
    if (!url) return;

    gasStatus.textContent = '⏳ 저장 중...';
    gasStatus.style.color = '#999';
    saveToSheetBtn.disabled = true;

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: 'save', projects: projects })
        });
        const data = await res.json();
        if (data.success) {
            gasStatus.textContent = `✅ ${data.savedCount}개 항목이 저장되었습니다.`;
            gasStatus.style.color = '#2e7d32';
        } else {
            gasStatus.textContent = '❌ 오류: ' + data.error;
            gasStatus.style.color = '#d44';
        }
    } catch (err) {
        gasStatus.textContent = '❌ 네트워크 오류: ' + err.message;
        gasStatus.style.color = '#d44';
    }
    saveToSheetBtn.disabled = false;
});

// 시트에서 불러오기
loadFromSheetBtn.addEventListener('click', async () => {
    const url = getGasUrl();
    if (!url) return;

    gasStatus.textContent = '⏳ 불러오는 중...';
    gasStatus.style.color = '#999';
    loadFromSheetBtn.disabled = true;

    try {
        const res = await fetch(url + '?action=list');
        const data = await res.json();
        if (data.success) {
            if (data.projects.length === 0) {
                gasStatus.textContent = 'ℹ 시트에 저장된 데이터가 없습니다.';
                gasStatus.style.color = '#999';
            } else {
                projects = data.projects;
                currentYearIndex = 0;
                updateUniqueYears();
                renderAdminList();
                renderTimeline();
                renderPreview();
                gasStatus.textContent = `✅ ${data.projects.length}개 항목을 불러왔습니다.`;
                gasStatus.style.color = '#1565c0';
            }
        } else {
            gasStatus.textContent = '❌ 오류: ' + data.error;
            gasStatus.style.color = '#d44';
        }
    } catch (err) {
        gasStatus.textContent = '❌ 네트워크 오류: ' + err.message;
        gasStatus.style.color = '#d44';
    }
    loadFromSheetBtn.disabled = false;
});
