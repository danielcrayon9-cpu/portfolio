import React, { useState, useRef, useEffect } from 'react';

const initialData = {
    personal: {
        name: "홍길동",
        role: "Web Publisher / Frontend Developer",
        email: "hong@example.com",
        github: "github.com/yourname",
        location: "Seoul, Korea",
        profileImage: null
    },
    dashboard: {
        career: { company: "SK하이닉스", status: "재직중", total: "총 5년" },
        education: { school: "한국대학교", desc: "대학교(4년) 졸업" },
        salary: { value: "면접 후 결정" },
        portfolio: { count: "총 0건" }
    },
    summary: "공공기관 웹사이트 및 접근성 인증 프로젝트를 다수 수행한 웹 퍼블리셔 겸 프론트엔드 개발자입니다. HTML, CSS, SCSS 구조화와 유지보수에 강점이 있으며, React 기반 프로젝트 경험도 보유하고 있습니다.",
    experience: [
        {
            id: 1,
            period: "2020.03 – 2024.12",
            company: "OOO Company",
            position: "Web Publisher",
            tasks: [
                "공공기관 웹사이트 퍼블리싱 및 유지보수",
                "웹 접근성(WA) 인증 대응",
                "SCSS 기반 디자인 시스템 정비"
            ]
        },
        {
            id: 2,
            period: "2017.01 – 2020.02",
            company: "XXX Studio",
            position: "Frontend Developer",
            tasks: [
                "React 기반 통계 시스템 화면 개발",
                "공공 컴포넌트 설계",
                "디자이너/기획자 협업"
            ]
        }
    ],
    skills: ["HTML5", "CSS3", "SCSS", "JavaScript", "React", "Web Accessibility"],
    projects: [
        {
            id: 1,
            title: "국회 통합 정보 시스템",
            description: "공공기관 통합 포털 퍼블리싱 및 접근성 인증 대응"
        },
        {
            id: 2,
            title: "부동산 통계 시스템 (R-ONE)",
            description: "React 기반 통계 화면 퍼블리싱 및 UI 개선"
        }
    ]
};

const STORAGE_KEY = 'resume-builder-data';

const ResumeBuilder = () => {
    const [data, setData] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : initialData;
        } catch (error) {
            console.error("Failed to parse saved data:", error);
            return initialData;
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [data]);

    const handleReset = () => {
        if (window.confirm("초기 데이터로 초기화하시겠습니까? 현재 입력된 모든 정보가 사라집니다.")) {
            setData(initialData);
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    const updatePersonal = (field, value) => {
        setData(prev => ({
            ...prev,
            personal: { ...prev.personal, [field]: value }
        }));
    };

    const updateSummary = (value) => {
        setData(prev => ({ ...prev, summary: value }));
    };

    const addExperience = () => {
        setData(prev => ({
            ...prev,
            experience: [
                ...prev.experience,
                {
                    id: Date.now(),
                    period: "Period",
                    company: "Company Name",
                    position: "Position",
                    tasks: ["Task 1"]
                }
            ]
        }));
    };

    const updateExperience = (id, field, value) => {
        setData(prev => ({
            ...prev,
            experience: prev.experience.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const updateExperienceTask = (expId, taskIndex, value) => {
        setData(prev => ({
            ...prev,
            experience: prev.experience.map(item => {
                if (item.id === expId) {
                    const newTasks = [...item.tasks];
                    newTasks[taskIndex] = value;
                    return { ...item, tasks: newTasks };
                }
                return item;
            })
        }));
    };

    const addExperienceTask = (expId) => {
        setData(prev => ({
            ...prev,
            experience: prev.experience.map(item =>
                item.id === expId ? { ...item, tasks: [...item.tasks, "New Task"] } : item
            )
        }));
    };

    const removeExperienceTask = (expId, taskIndex) => {
        setData(prev => ({
            ...prev,
            experience: prev.experience.map(item =>
                item.id === expId ? { ...item, tasks: item.tasks.filter((_, i) => i !== taskIndex) } : item
            )
        }));
    };

    const removeExperience = (id) => {
        setData(prev => ({
            ...prev,
            experience: prev.experience.filter(item => item.id !== id)
        }));
    };

    const addSkill = () => {
        const skill = prompt("Enter skill name:");
        if (skill) {
            setData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
        }
    };

    const removeSkill = (index) => {
        setData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const addProject = () => {
        setData(prev => ({
            ...prev,
            projects: [
                ...prev.projects,
                {
                    id: Date.now(),
                    title: "Project Title",
                    description: "Project Description"
                }
            ]
        }));
    };

    const updateProject = (id, field, value) => {
        setData(prev => ({
            ...prev,
            projects: prev.projects.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const removeProject = (id) => {
        setData(prev => ({
            ...prev,
            projects: prev.projects.filter(item => item.id !== id)
        }));
    };

    const updateDashboard = (category, field, value) => {
        setData(prev => ({
            ...prev,
            dashboard: {
                ...prev.dashboard,
                [category]: { ...prev.dashboard[category], [field]: value }
            }
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updatePersonal('profileImage', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const exportHTML = () => {
        const css = `
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    :root {
      --bg: #ffffff;
      --card: #f8fafc;
      --text: #0f172a;
      --muted: #64748b;
      --accent: #38bdf8;
      --border: #e2e8f0;
      --danger: #ef4444;
      --success: #22c55e;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
    }
    a { color: var(--accent); text-decoration: none; }
    .container { max-width: 900px; margin: 0 auto; padding: 40px 20px 80px; }
    header {
      margin-bottom: 48px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .header-content { flex: 1; }
    header h1 { font-size: 36px; margin: 0 0 8px; }
    header p { color: var(--muted); margin: 0; }
    .header-meta { margin-top: 16px; display: flex; flex-wrap: wrap; gap: 16px; font-size: 14px; }
    .profile-picture-container {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px dashed var(--border);
      background: var(--card);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .profile-picture-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    section { margin-bottom: 48px; }
    section h2 { font-size: 22px; margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 8px; }
    .card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-bottom: 16px; }
    .experience-item { display: grid; grid-template-columns: 120px 1fr; gap: 20px; }
    .experience-period { color: var(--muted); font-size: 14px; }
    .experience-content h3 { margin: 0 0 4px; font-size: 18px; }
    .experience-content span { font-size: 14px; color: var(--muted); }
    .experience-content ul { margin: 12px 0 0; padding-left: 18px; }
    .experience-content li { margin-bottom: 6px; font-size: 14px; }
    .skill-list { display: flex; flex-wrap: wrap; gap: 10px; }
    .skill { background: var(--bg); border: 1px solid var(--border); border-radius: 999px; padding: 6px 14px; font-size: 13px; color: var(--text); }
    .project h3 { margin: 0 0 8px; font-size: 18px; }
    .project p { margin: 0; font-size: 14px; color: var(--muted); }
    
    /* Dashboard */
    .resume_dashboard {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      list-style: none;
      padding: 0;
      margin: 0 0 48px 0;
    }
    .resume_dashboard .item {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
    }
    .resume_dashboard .tit {
      font-size: 14px;
      color: var(--muted);
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .resume_dashboard .txt {
      margin: 0;
      display: flex;
      flex-direction: column;
    }
    .resume_dashboard .txt_top {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .resume_dashboard .emph {
      font-weight: bold;
      font-size: 18px;
      color: var(--text);
    }
    .resume_dashboard .badge_state {
      background: var(--accent);
      color: #000;
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: bold;
    }
    .resume_dashboard .txt_bottom {
      font-size: 13px;
      color: var(--muted);
      margin-top: 4px;
    }
    
    @media (max-width: 640px) {
      .experience-item { grid-template-columns: 1fr; }
      .resume_dashboard { grid-template-columns: 1fr; }
    }
    `;

        const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>Resume - ${data.personal.name}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>${css}</style>
</head>
<body>
  <div class="container">
    <header>
      <div class="header-content">
        <h1>${data.personal.name}</h1>
        <p>${data.personal.role}</p>
        <div class="header-meta">
          <span>📧 ${data.personal.email}</span>
          <span>🌐 ${data.personal.github}</span>
          <span>📍 ${data.personal.location}</span>
        </div>
      </div>
      ${data.personal.profileImage ? `
      <div class="profile-picture-container">
        <img src="${data.personal.profileImage}" alt="Profile" />
      </div>
      ` : ''}
    </header>

    <ul class="resume_dashboard">
      <li class="item">
        <strong class="tit"><span class="material-icons" style="font-size:16px;">work</span>경력</strong>
        <p class="txt">
          <span class="txt_top">
            <span class="emph">${data.dashboard.career.company}</span>
            <span class="badge_state">${data.dashboard.career.status}</span>
          </span>
          <span class="txt_bottom">${data.dashboard.career.total}</span>
        </p>
      </li>
      <li class="item">
        <strong class="tit"><span class="material-icons" style="font-size:16px;">school</span>학력</strong>
        <p class="txt">
          <span class="txt_top">
            <span class="emph">${data.dashboard.education.school}</span>
          </span>
          <span class="txt_bottom">${data.dashboard.education.desc}</span>
        </p>
      </li>
      <li class="item">
        <strong class="tit"><span class="material-icons" style="font-size:16px;">payments</span>희망연봉</strong>
        <p class="txt">
          <span class="txt_top">
            <span class="emph">${data.dashboard.salary.value}</span>
          </span>
        </p>
      </li>
      <li class="item">
        <strong class="tit"><span class="material-icons" style="font-size:16px;">folder</span>포트폴리오</strong>
        <p class="txt">
          <span class="txt_top">
            <span class="emph">${data.dashboard.portfolio.count}</span>
          </span>
        </p>
      </li>
    </ul>

    <section>
      <h2>Summary</h2>
      <div class="card">${data.summary}</div>
    </section>

    <section>
      <h2>Experience</h2>
      ${data.experience.map(exp => `
      <div class="card experience-item">
        <div class="experience-period">${exp.period}</div>
        <div class="experience-content">
          <h3>${exp.company}</h3>
          <span>${exp.position}</span>
          <ul>
            ${exp.tasks.map(task => `<li>${task}</li>`).join('')}
          </ul>
        </div>
      </div>
      `).join('')}
    </section>

    <section>
      <h2>Skills</h2>
      <div class="skill-list">
        ${data.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
      </div>
    </section>

    <section>
      <h2>Projects</h2>
      ${data.projects.map(proj => `
      <div class="card project">
        <h3>${proj.title}</h3>
        <p>${proj.description}</p>
      </div>
      `).join('')}
    </section>
  </div>
</body>
</html>
    `;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resume_${data.personal.name}.html`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container" style={{ paddingBottom: '120px' }}>
            {/* HEADER */}
            <header>
                <div className="header-content">
                    <h1
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => updatePersonal('name', e.target.innerText)}
                    >
                        {data.personal.name}
                    </h1>
                    <p
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => updatePersonal('role', e.target.innerText)}
                    >
                        {data.personal.role}
                    </p>

                    <div className="header-meta">
                        <span>📧 </span>
                        <span
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => updatePersonal('email', e.target.innerText.replace('📧', '').trim())}
                        >
                            {data.personal.email}
                        </span>
                        <span>🌐 </span>
                        <span
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => updatePersonal('github', e.target.innerText.replace('🌐', '').trim())}
                        >
                            {data.personal.github}
                        </span>
                        <span>📍 </span>
                        <span
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => updatePersonal('location', e.target.innerText.replace('📍', '').trim())}
                        >
                            {data.personal.location}
                        </span>
                    </div>
                </div>

                <div className="profile-picture-container" onClick={() => document.getElementById('profile-upload').click()}>
                    {data.personal.profileImage ? (
                        <img src={data.personal.profileImage} alt="Profile" />
                    ) : (
                        <div className="profile-placeholder">
                            <span className="material-icons" style={{ fontSize: '32px' }}>add_a_photo</span>
                            <br />사진 추가
                        </div>
                    )}
                    <input
                        type="file"
                        id="profile-upload"
                        hidden
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>
            </header>

            {/* DASHBOARD */}
            <ul className="resume_dashboard">
                <li className="item">
                    <strong className="tit career"><span className="material-icons" style={{ fontSize: '18px' }}>work</span>경력</strong>
                    <p className="txt">
                        <span className="txt_top">
                            <span
                                className="emph"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => updateDashboard('career', 'company', e.target.innerText)}
                            >{data.dashboard.career.company}</span>
                            <span
                                className="badge_state"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => updateDashboard('career', 'status', e.target.innerText)}
                            >{data.dashboard.career.status}</span>
                        </span>
                        <span
                            className="txt_bottom"
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => updateDashboard('career', 'total', e.target.innerText)}
                        >{data.dashboard.career.total}</span>
                    </p>
                </li>
                <li className="item">
                    <strong className="tit education"><span className="material-icons" style={{ fontSize: '18px' }}>school</span>학력</strong>
                    <p className="txt">
                        <span className="txt_top">
                            <span
                                className="emph"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => updateDashboard('education', 'school', e.target.innerText)}
                            >{data.dashboard.education.school}</span>
                        </span>
                        <span
                            className="txt_bottom"
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => updateDashboard('education', 'desc', e.target.innerText)}
                        >{data.dashboard.education.desc}</span>
                    </p>
                </li>
                <li className="item">
                    <strong className="tit payment"><span className="material-icons" style={{ fontSize: '18px' }}>payments</span>희망연봉</strong>
                    <p className="txt">
                        <span className="txt_top">
                            <span
                                className="emph"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => updateDashboard('salary', 'value', e.target.innerText)}
                            >{data.dashboard.salary.value}</span>
                        </span>
                    </p>
                </li>
                <li className="item">
                    <strong className="tit file"><span className="material-icons" style={{ fontSize: '18px' }}>folder</span>포트폴리오</strong>
                    <p className="txt">
                        <span className="txt_top">
                            <span
                                className="emph"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => updateDashboard('portfolio', 'count', e.target.innerText)}
                            >{data.dashboard.portfolio.count}</span>
                        </span>
                    </p>
                </li>
            </ul>

            {/* SUMMARY */}
            <section>
                <h2>Summary</h2>
                <div
                    className="card"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateSummary(e.target.innerText)}
                >
                    {data.summary}
                </div>
            </section>

            {/* EXPERIENCE */}
            <section>
                <h2>
                    Experience
                    <button className="btn btn-accent" onClick={addExperience}>+ Add</button>
                </h2>

                {data.experience.map((exp) => (
                    <div key={exp.id} className="card experience-item">
                        <div className="edit-controls">
                            <button className="btn btn-danger" onClick={() => removeExperience(exp.id)}>Delete Experience</button>
                        </div>
                        <div
                            className="experience-period"
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => updateExperience(exp.id, 'period', e.target.innerText)}
                        >
                            {exp.period}
                        </div>
                        <div className="experience-content">
                            <h3
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => updateExperience(exp.id, 'company', e.target.innerText)}
                            >
                                {exp.company}
                            </h3>
                            <span
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => updateExperience(exp.id, 'position', e.target.innerText)}
                            >
                                {exp.position}
                            </span>
                            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                                {exp.tasks.map((task, idx) => (
                                    <li key={idx} className="task-item" style={{ position: 'relative', paddingRight: '40px', marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                                        <span style={{ marginRight: '8px' }}>•</span>
                                        <span
                                            contentEditable
                                            suppressContentEditableWarning
                                            style={{ flex: 1 }}
                                            onBlur={(e) => updateExperienceTask(exp.id, idx, e.target.innerText)}
                                        >
                                            {task}
                                        </span>
                                        <button
                                            className="btn btn-danger"
                                            style={{ position: 'absolute', right: 0, top: 0, padding: '0px 6px', fontSize: '10px' }}
                                            onClick={() => removeExperienceTask(exp.id, idx)}
                                        >
                                            x
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button className="btn" style={{ padding: '2px 8px', marginTop: '8px' }} onClick={() => addExperienceTask(exp.id)}>+ Add Task</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </section>

            {/* SKILLS */}
            <section>
                <h2>
                    Skills
                    <button className="btn btn-accent" onClick={addSkill}>+ Add</button>
                </h2>
                <div className="card skill-list">
                    {data.skills.map((skill, index) => (
                        <span key={index} className="skill">
                            {skill}
                            <div className="edit-controls" style={{ top: '-10px', right: '-10px' }}>
                                <button className="btn btn-danger" style={{ borderRadius: '50%', padding: '2px 5px' }} onClick={() => removeSkill(index)}>x</button>
                            </div>
                        </span>
                    ))}
                </div>
            </section>

            {/* PROJECTS */}
            <section>
                <h2>
                    Projects
                    <button className="btn btn-accent" onClick={addProject}>+ Add</button>
                </h2>

                {data.projects.map((proj) => (
                    <div key={proj.id} className="card project">
                        <div className="edit-controls">
                            <button className="btn btn-danger" onClick={() => removeProject(proj.id)}>Delete</button>
                        </div>
                        <h3
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => updateProject(proj.id, 'title', e.target.innerText)}
                        >
                            {proj.title}
                        </h3>
                        <p
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => updateProject(proj.id, 'description', e.target.innerText)}
                        >
                            {proj.description}
                        </p>
                    </div>
                ))}
            </section>

            <div className="export-bar">
                <button className="btn btn-danger" style={{ padding: '12px 24px', fontSize: '16px' }} onClick={handleReset}>
                    🔄 Reset Data
                </button>
                <button className="btn btn-accent" style={{ padding: '12px 24px', fontSize: '16px' }} onClick={exportHTML}>
                    💾 Export HTML (For Submission)
                </button>
            </div>      </div>
    );
};

export default ResumeBuilder;
