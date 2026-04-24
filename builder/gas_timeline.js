/**
 * ============================================================
 * Timeline Builder - Google Apps Script Backend
 * ============================================================
 * 
 * [사용 방법]
 * 1. https://script.google.com 에서 새 프로젝트를 생성합니다.
 * 2. 아래 코드를 전체 복사하여 붙여넣습니다.
 * 3. SPREADSHEET_ID를 본인의 Google Sheets ID로 변경합니다.
 *    (새 스프레드시트를 생성하면 URL에서 ID를 확인할 수 있습니다)
 *    https://docs.google.com/spreadsheets/d/여기가_ID/edit
 * 4. "배포" → "새 배포" → 유형: "웹 앱"
 *    - 실행 계정: "나" (danielcrayon9@gmail.com)
 *    - 액세스 권한: "모든 사용자"
 * 5. 배포된 URL을 builder/index.html의 GAS_URL 변수에 설정합니다.
 * ============================================================
 */

// ★★★ 본인의 스프레드시트 ID로 변경하세요 ★★★
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'TimelineData';

function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['year', 'title', 'description', 'tech', 'createdAt']);
  }
  return sheet;
}

/**
 * GET 요청 처리 (데이터 조회, 삭제, 전체 저장)
 */
function doGet(e) {
  try {
    const action = e.parameter.action || 'list';

    if (action === 'list') {
      return handleList();
    } else if (action === 'clear') {
      return handleClear();
    }

    return jsonResponse({ success: false, error: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

/**
 * POST 요청 처리 (데이터 저장)
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action || 'save';

    if (action === 'save') {
      return handleSave(data.projects || []);
    } else if (action === 'add') {
      return handleAdd(data);
    }

    return jsonResponse({ success: false, error: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

/**
 * 전체 프로젝트 목록 조회
 */
function handleList() {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return jsonResponse({ success: true, projects: [] });
  }

  const projects = [];
  for (let i = 1; i < data.length; i++) {
    projects.push({
      year: Number(data[i][0]),
      title: data[i][1],
      description: data[i][2],
      tech: data[i][3],
      createdAt: data[i][4]
    });
  }

  return jsonResponse({ success: true, projects: projects });
}

/**
 * 전체 데이터 교체 저장 (덮어쓰기)
 */
function handleSave(projects) {
  const sheet = getOrCreateSheet();

  // 헤더 제외 전체 삭제
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
  }

  // 새로운 데이터 일괄 추가
  const now = new Date().toISOString();
  projects.forEach(p => {
    sheet.appendRow([
      p.year || '',
      p.title || '',
      p.description || '',
      p.tech || '',
      now
    ]);
  });

  return jsonResponse({ success: true, savedCount: projects.length });
}

/**
 * 개별 항목 추가
 */
function handleAdd(data) {
  const sheet = getOrCreateSheet();
  const now = new Date().toISOString();
  sheet.appendRow([
    data.year || '',
    data.title || '',
    data.description || '',
    data.tech || '',
    now
  ]);
  return jsonResponse({ success: true });
}

/**
 * 전체 데이터 삭제
 */
function handleClear() {
  const sheet = getOrCreateSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
  }
  return jsonResponse({ success: true });
}

/**
 * JSON 응답 생성 (CORS 지원)
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
