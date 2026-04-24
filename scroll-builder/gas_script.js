/**
 * ============================================================
 * Scroll Portfolio Builder - Google Apps Script Backend
 * ============================================================
 * 
 * [사용 방법]
 * 1. https://script.google.com 에서 새 프로젝트 생성
 * 2. 아래 코드를 전체 복사 → 붙여넣기
 * 3. SPREADSHEET_ID를 본인의 Google Sheets ID로 변경
 * 4. "배포" → "새 배포" → 유형: "웹 앱"
 *    - 실행 계정: "나"
 *    - 액세스 권한: "모든 사용자"
 * 5. 배포 URL을 빌더의 GAS URL 입력란에 설정
 * 
 * 데이터 구조: year, title (2개 필드만 사용)
 * ============================================================
 */

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'ScrollPortfolio';

function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['year', 'title']);
  }
  return sheet;
}

function doGet(e) {
  try {
    const action = e.parameter.action || 'list';
    if (action === 'list') return handleList();
    if (action === 'clear') return handleClear();
    return jsonResponse({ success: false, error: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action === 'save') return handleSave(data.projects || []);
    return jsonResponse({ success: false, error: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

function handleList() {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return jsonResponse({ success: true, projects: [] });

  const projects = [];
  for (let i = 1; i < data.length; i++) {
    projects.push({ year: Number(data[i][0]), title: String(data[i][1]) });
  }
  return jsonResponse({ success: true, projects: projects });
}

function handleSave(projects) {
  const sheet = getOrCreateSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) sheet.deleteRows(2, lastRow - 1);

  projects.forEach(function(p) {
    sheet.appendRow([p.year || '', p.title || '']);
  });

  return jsonResponse({ success: true, savedCount: projects.length });
}

function handleClear() {
  const sheet = getOrCreateSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) sheet.deleteRows(2, lastRow - 1);
  return jsonResponse({ success: true });
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
