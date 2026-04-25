// ===== State =====
let projects = [
    { year: 2026, title: "디지털혁신실 통합운영", client: "한국은행" },

    { year: 2025, title: "부동산통계정보시스템(R-ONE) 고도화", client: "한국부동산원" },
    { year: 2025, title: "한국부동산테크 홈페이지 고도화", client: "한국부동산원" },
    { year: 2025, title: "의안정보시스템 홈페이지, 모바일앱", client: "국회사무처" },
    { year: 2025, title: "소프트웨어 통계 시스템", client: "과학기술정보통신부" },
    { year: 2025, title: "국회뉴스 ON 홈페이지", client: "국회사무처" },

    { year: 2024, title: "한화큐셀 물류정보화시스템", client: "한화시스템" },
    { year: 2024, title: "한국은행 위조화폐관리시스템", client: "한국은행" },
    { year: 2024, title: "국립중앙의료원 아이안심톡", client: "국립중앙의료원" },
    { year: 2024, title: "탄자니아(잔지바르) 통계 DB서비스 시스템 구축", client: "정보통신부" },

    { year: 2023, title: "대한민국국회 국/영문 홈페이지, 모바일앱", client: "국회사무처" },
    { year: 2023, title: "대한민국어린이국회", client: "국회사무처" },
    { year: 2023, title: "국회사무처 국/영문 홈페이지", client: "국회사무처" },
    { year: 2023, title: "국회상임위원회 및 특별위원회 홈페이지", client: "국회사무처" },
    { year: 2023, title: "국민동의청원 홈페이지", client: "국회사무처" },
    { year: 2023, title: "국회박물관 국/영문 홈페이지", client: "국회사무처" },
    { year: 2023, title: "국회통합예약 홈페이지", client: "국회사무처" },
    { year: 2023, title: "국회의정연수원 홈페이지", client: "국회사무처" },

    { year: 2023, title: "한국은행 스냅샷 홈페이지", client: "한국은행" },
    { year: 2023, title: "경기도청 경기데이터드림", client: "경기도청" },

    { year: 2022, title: "국회입법예고시스템", client: "국회사무처" },
    { year: 2022, title: "공공보건의료지원단 시립병원 통계시스템", client: "서울특별시" },
    { year: 2022, title: "환경통계정보시스템 고도화", client: "기후에너지환경부" },
    { year: 2022, title: "국립중앙의료원 응급의료통계포털", client: "국립중앙의료원" },
    { year: 2022, title: "형사사법통계 DB구축사업", client: "한국형사정책연구원" },
    { year: 2022, title: "주택금융통계시스템(HOUSTATS) 고도화", client: "HF주택금융공사" },
    { year: 2022, title: "보훈데이터 분석 및 활용 플랫폼", client: "국가보훈처" },

    { year: 2021, title: "국회 지능형 입법정보서비스 2단계 구축", client: "국회사무처" },
    { year: 2021, title: "범죄통계포털 CCJS 운영 및 개선", client: "한국형사정책연구원" },
    { year: 2021, title: "환경통계정보시스템 재구축 2차", client: "기후에너지환경부" },

    { year: 2020, title: "국회 헌정포털", client: "국회사무처" },
    { year: 2020, title: "범죄통계포털 CCJS 운영 및 개선", client: "한국형사정책연구원" },
    { year: 2020, title: "환경통계정보시스템 재구축 1차", client: "기후에너지환경부" },

    { year: 2019, title: "열린국회정보 시스템", client: "" },
    { year: 2019, title: "범죄통계포털 CCJS 운영 및 개선", client: "한국형사정책연구원" },

    { year: 2018, title: "국회예산처 재정경제통계시스템(Nabostats)", client: "국회예산처" },
    { year: 2018, title: "광명나눔데이터광장 통계포털", client: "광명시청" },
    { year: 2018, title: "주택금융통계시스템", client: "HF주택금융공사" },
    { year: 2018, title: "범죄통계포털 CCJS 운영 및 개선", client: "한국형사정책연구원" },

    { year: 2017, title: "디지털예산회계시스템 개선 및 열린재정/재정분석시스템 고도화", client: "한국재정정보원" },
    { year: 2017, title: "차세대 응급의료정보망 구축 3차", client: "국립중앙의료원" },
    { year: 2017, title: "범죄통계포털 CCJS 운영 및 개선", client: "한국형사정책연구원" },

    { year: 2016, title: "재난안전데이터포털", client: "국민안전처" },
    { year: 2016, title: "응급의료정보망 구축 2차", client: "국립중앙의료원" },
    { year: 2016, title: "안산시 공공데이터 제공시스템 확대", client: "안산시청" },

    { year: 2015, title: "응급의료 데이터 모니터링 시스템", client: "국립중앙의료원" },
    { year: 2015, title: "범죄통계포털 CCJS 운영 및 개선", client: "한국형사정책연구원" },

    { year: 2014, title: "통합재정정보 공개시스템", client: "기획재정부" },
    { year: 2014, title: "범죄통계포털 CCJS 운영 및 개선", client: "한국형사정책연구원" },
    { year: 2014, title: "국가에너지통계 종합정보시스템(KESIS) 4차", client: "에너지경제연구원" },

    { year: 2013, title: "행정데이터 통합 및 열린데이터광장 확장(통합)", client: "서울시청" },
    { year: 2013, title: "한국은행 채용시스템", client: "한국은행" },
    { year: 2013, title: "범죄통계포털 CCJS 홈페이지 개선", client: "한국형사정책연구원" },
    { year: 2013, title: "키움증권 원장 차세대 구축", client: "키움증권" },

    { year: 2012, title: "국가에너지통계 종합정보시스템(KESIS) 3차 고도화", client: "에너지경제연구원" },
    { year: 2012, title: "서울시청 행정데이터 통합 및 열린데이터광장 확장", client: "서울시청" },

    { year: 2011, title: "경제통계시스템(ECOS) 고도화", client: "한국은행" },
    { year: 2011, title: "온라인총조사 고도화", client: "에너지경제연구원" },
    { year: 2011, title: "통합전략경영시스템(CRM부문)", client: "공무원연금공단" },

    { year: 2010, title: "국가에너지통계 종합정보시스템 DW 및 포털 고도화", client: "에너지경제연구원" },
    { year: 2010, title: "데이터품질관리시스템", client: "서울시청" },
    { year: 2010, title: "대한민국포털 고도화", client: "행안부" },

    { year: 2009, title: "인천국제공항공사 ITSM 시스템 고도화", client: "인천국제공항공사" },
    { year: 2009, title: "국민체육진흥공단 경륜운영본부 SPEEDOM 스크린 UI 개선", client: "국민체육진흥공단" },

    { year: 2008, title: "아윌패스 포털 및 계열사 홈페이지 리뉴얼", client: "아윌패스" },
    { year: 2008, title: "제니스 아카데미 홈페이지", client: "아윌패스" },
    { year: 2008, title: "잉글리쉬패스 홈페이지 리뉴얼", client: "아윌패스" },

    { year: 2007, title: "TBS교통방송 포털 고도화", client: "TBS교통방송" },
    { year: 2007, title: "서울시 강동구청 청소년 홈페이지", client: "강동구청" },
    { year: 2007, title: "(주)아이티사룩스 국/영문 홈페이지", client: "(주)아이티사룩스" },
    { year: 2007, title: "(주)아이티사룩스 IPTV UI 디자인", client: "(주)아이티사룩스" },

    { year: 2006, title: "서울시 광진구청 포털 고도화", client: "광진구청" },
    { year: 2006, title: "서울시 강서구청 포털 고도화", client: "강서구청" },
    { year: 2006, title: "서울시 양천구청 장애인/노인 홈페이지", client: "양천구청" },
    { year: 2006, title: "부산시청 홈페이지", client: "부산시청" },

    { year: 2005, title: "비상기획위원회 홈페이지", client: "비상기획위원회" },
    { year: 2005, title: "대구교육청 홈페이지", client: "대구교육청" },

    { year: 2004, title: "상가/용지 인터넷 청약 시스템", client: "대한주택공사" },
    { year: 2004, title: "환경과학기술연구소 홈페이지", client: "환경과학기술연구소" },
    { year: 2004, title: "연합뉴스 홈페이지 배너 및 지면광고", client: "연합뉴스" },

    { year: 2003, title: "관동대학교 입시종합정보시스템", client: "관동대학교" },

    { year: 2002, title: "인천정유 홈페이지 리뉴얼", client: "인천정유" },
    { year: 2002, title: "(주)종근당제약 다이어트 홈페이지", client: "(주)종근당제약" },
    { year: 2002, title: "우리신용정보 실시간 은행정보조회 시스템", client: "우리신용정보" },

    { year: 2001, title: "(주)세계사이버기원 홈페이지", client: "(주)세계사이버기원" },
    { year: 2001, title: "Warranty Information System", client: "현대전자" },
    { year: 2001, title: "Compaq Online Brochure", client: "Compaq" },
    { year: 2001, title: "Compaq 서버 홍보사이트", client: "Compaq" },

    { year: 2000, title: "한전KDN 종합정보시스템", client: "한전KDN" },
    { year: 2000, title: "(주)세방여행사 홈페이지", client: "(주)세방여행사" },
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
const timelineNav = document.getElementById('timelineNav');
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
    window.addEventListener('resize', () => handleScroll());
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

    // Render timeline nav
    renderTimeline();
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

    if (activeYear !== null) {
        updateYearDisplay(activeYear);
        updateTimelineDots(activeYear);
    }
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

// ===== Timeline Navigation =====
function renderTimeline() {
    timelineNav.innerHTML = '';
    const years = [...new Set(projects.map(p => parseInt(p.year)))].sort((a, b) => b - a);
    if (years.length === 0) return;

    const track = document.createElement('div');
    track.className = 'timeline-track';

    const fill = document.createElement('div');
    fill.className = 'timeline-fill';
    fill.id = 'timelineFill';
    track.appendChild(fill);

    const line = document.createElement('div');
    line.className = 'timeline-line';
    track.appendChild(line);

    years.forEach(year => {
        const dot = document.createElement('div');
        dot.className = 'timeline-dot';
        dot.dataset.year = year;

        const circle = document.createElement('div');
        circle.className = 'timeline-dot-circle';

        const label = document.createElement('span');
        label.className = 'timeline-dot-year';
        label.textContent = year;

        dot.appendChild(circle);
        dot.appendChild(label);
        dot.addEventListener('click', () => scrollToYear(year));
        track.appendChild(dot);
    });

    timelineNav.appendChild(track);
}

function updateTimelineDots(activeYear) {
    const dots = timelineNav.querySelectorAll('.timeline-dot');
    const fill = document.getElementById('timelineFill');
    let activeDot = null;

    dots.forEach(dot => {
        const year = parseInt(dot.dataset.year);
        const isActive = year === activeYear;
        const isPassed = year >= activeYear;
        dot.classList.toggle('active', isActive);
        dot.classList.toggle('passed', isPassed);
        if (isActive) activeDot = dot;
    });

    // Fill 높이를 active dot 하단까지 설정
    if (activeDot && fill) {
        const track = activeDot.closest('.timeline-track');
        const trackRect = track.getBoundingClientRect();
        const dotRect = activeDot.getBoundingClientRect();
        const fillHeight = dotRect.bottom - trackRect.top;
        fill.style.height = fillHeight + 'px';
    }
}

function scrollToYear(year) {
    const label = viewerRight.querySelector(`.year-group-label[data-year="${year}"]`);
    if (!label) return;
    const panelRect = previewPanel.getBoundingClientRect();
    const labelTop = label.getBoundingClientRect().top;
    const offset = panelRect.height * 0.4;
    previewPanel.scrollBy({ top: labelTop - panelRect.top - offset, behavior: 'smooth' });
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
.vr{flex:1;padding:50vh 2rem 50vh 0}
.ygl{font-size:.58rem;font-weight:600;color:var(--light);text-transform:uppercase;letter-spacing:.2em;padding:3rem 0 1rem 0}
.ygl:first-child{padding-top:0}
.vi{display:flex;align-items:baseline;gap:1.2rem;padding:1.5rem 0;border-bottom:1px solid var(--border);transition:opacity .3s ease,transform .3s ease;will-change:opacity,transform}
.vi:last-child{border-bottom:none}
.ii{font-size:.62rem;color:var(--dim);font-weight:500;min-width:1.5rem;font-variant-numeric:tabular-nums}
.it{font-size:1.3rem;font-weight:400;line-height:1.5;color:var(--text)}
.ic{display:flex;flex-direction:column;gap:0.4rem}
.icl{display:inline-block;font-size:.8rem;font-weight:500;color:#666;background:rgba(0,0,0,0.04);border:1px solid rgba(0,0,0,0.06);padding:.2rem .55rem;border-radius:100px;width:fit-content}
.tn{width:80px;position:sticky;top:0;height:100vh;display:flex;flex-direction:column;align-items:stretch;justify-content:center;flex-shrink:0}
.tt{position:relative;display:flex;flex-direction:column;align-items:stretch;justify-content:space-between;height:100vh;padding:1.5rem 0;background:#fff}
.tf{position:absolute;top:0;left:0;right:0;height:0;background:#11111170;transition:height .4s cubic-bezier(.16,1,.3,1);z-index:0}
.tl{position:absolute;top:0;bottom:0;width:1px;background:rgba(0,0,0,0.08);right:calc(.6rem + 3px);z-index:0}
.td{position:relative;z-index:1;display:flex;flex-direction:row;align-items:center;justify-content:flex-end;gap:.4rem;cursor:pointer;padding:.15rem .6rem;transition:all .3s ease}
.tdc{width:6px;height:6px;border-radius:50%;background:rgba(0,0,0,0.15);transition:all .3s ease;flex-shrink:0;order:2}
.tdy{font-size:.72rem;font-weight:500;color:rgba(0,0,0,0.18);letter-spacing:.02em;transition:all .3s ease;white-space:nowrap;order:1}
.td.passed .tdy{color:rgba(255,255,255,0.7)}
.td.passed .tdc{background:rgba(255,255,255,0.4)}
.td.active .tdy{color:#fff;font-size:.95rem;font-weight:700;animation:yp 2s ease-in-out infinite}
.td.active .tdc{width:8px;height:8px;background:#fff}
@keyframes yp{0%,100%{opacity:1}50%{opacity:.5}}
.td:hover .tdy{color:rgba(0,0,0,0.6)}
.td.passed:hover .tdy{color:#fff}
.select-type-link{position:fixed;top:10px;left:10px;z-index:10050;font-family:var(--font);font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;color:#3a3a3a;background:rgba(255,255,255,.95);border:1px solid rgba(0,0,0,.1);padding:5px 10px;border-radius:999px;box-shadow:0 1px 5px rgba(0,0,0,.08);transition:color .2s,border-color .2s,background .2s,box-shadow .2s}
.select-type-link:hover{color:#111;border-color:rgba(0,0,0,.18);background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.1)}
@media(max-width:1000px){.vc{flex-direction:column}.vl{width:100%;height:auto;padding:2rem 1.5rem 1rem;justify-content:center;position:sticky;top:0;background:var(--bg);z-index:10}.yd{width:100%;height:5rem;justify-content:center}.yr{width:100%;justify-content:center}.yt{font-size:4rem;right:0;left:0;text-align:center}.vr{width:100%;padding:1rem 1.5rem 40vh}.ygl{padding-top:2rem}.vi{padding:1.2rem 0}.it{font-size:1.05rem}.tn{display:none}}
</style>
</head>
<body>
<a class="select-type-link" href="../index.html">Select Type</a>
<div class="vc">
<div class="vl"><div class="yd"><div class="yr" id="yr"></div></div></div>
<div class="vr" id="vr"></div>
<div class="tn" id="tn"></div>
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
rT();requestAnimationFrame(hS)}
function rT(){
var tn=document.getElementById('tn');tn.innerHTML='';
var yrs=[];P.forEach(function(p){var y=parseInt(p.year);if(yrs.indexOf(y)===-1)yrs.push(y)});
yrs.sort(function(a,b){return b-a});
if(yrs.length===0)return;
var tk=document.createElement('div');tk.className='tt';
var fl=document.createElement('div');fl.className='tf';fl.id='tf';tk.appendChild(fl);
var ln=document.createElement('div');ln.className='tl';tk.appendChild(ln);
yrs.forEach(function(y){
var dt=document.createElement('div');dt.className='td';dt.dataset.year=y;
var c=document.createElement('div');c.className='tdc';
var lb=document.createElement('span');lb.className='tdy';lb.textContent=y;
dt.appendChild(c);dt.appendChild(lb);
dt.addEventListener('click',function(){
var el=document.querySelector('.ygl[data-year="'+y+'"]');
if(el)window.scrollTo({top:el.offsetTop-window.innerHeight*0.4,behavior:'smooth'})});
tk.appendChild(dt)});
tn.appendChild(tk)}
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
if(ay!==null){uY(ay);uTD(ay)}}
function uTD(y){var dots=document.querySelectorAll('.td');
var fl=document.getElementById('tf');var ad=null;
dots.forEach(function(d){var dy=parseInt(d.dataset.year);
var isA=dy===y;var isP=dy>=y;
if(isA){d.classList.add('active');d.classList.add('passed');ad=d}
else{d.classList.remove('active');if(isP)d.classList.add('passed');else d.classList.remove('passed')}});
if(ad&&fl){var tk=ad.closest('.tt');var tr=tk.getBoundingClientRect();var dr=ad.getBoundingClientRect();fl.style.height=(dr.bottom-tr.top)+'px'}}
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
window.addEventListener('resize',function(){hS()});
render();
${scriptEnd}
</body>
</html>`;


    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
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
