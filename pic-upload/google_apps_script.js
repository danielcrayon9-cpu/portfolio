/**
 * ============================================================
 * Portfolio Manager - Google Apps Script Backend
 * ============================================================
 * 
 * [사용 방법]
 * 1. https://script.google.com 에서 새 프로젝트를 생성합니다.
 * 2. 아래 코드를 전체 복사하여 붙여넣습니다.
 * 3. 아래 두 상수를 본인의 것으로 변경합니다:
 *    - SPREADSHEET_ID: Google Sheets 문서의 ID
 *    - DRIVE_FOLDER_ID: 이미지를 저장할 Google Drive 폴더의 ID
 * 4. "배포" → "새 배포" → 유형: "웹 앱"
 *    - 실행 계정: "나"
 *    - 액세스 권한: "모든 사용자"
 * 5. 배포된 URL을 portfolio_upload.html의 GAS_WEB_APP_URL에 설정합니다.
 * 
 * [Google Sheets ID 확인 방법]
 * URL에서: https://docs.google.com/spreadsheets/d/여기가_SPREADSHEET_ID/edit
 * 
 * [Google Drive 폴더 ID 확인 방법]
 * URL에서: https://drive.google.com/drive/folders/여기가_DRIVE_FOLDER_ID
 * ============================================================
 */

// ★★★ 아래 두 값을 본인의 것으로 변경하세요 ★★★
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const DRIVE_FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID_HERE';

const SHEET_NAME = 'PortfolioData';
const TABS_SHEET_NAME = 'TabsConfig';

/**
 * 스프레드시트와 시트 초기화
 */
function getOrCreateSheet(sheetName) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    if (sheetName === SHEET_NAME) {
      sheet.appendRow(['id', 'img_url', 'driveFileId', 'caption', 'year', 'tag', 'url', 'isPc', 'isResponsive', 'isMobile', 'order', 'isHidden', 'tabCategory']);
    } else if (sheetName === TABS_SHEET_NAME) {
      sheet.appendRow(['config']);
    }
  }
  return sheet;
}

/**
 * POST 요청 처리 — 이미지 업로드
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action || 'upload';

    if (action === 'upload') {
      return handleUpload(data);
    } else if (action === 'updateImage') {
      return handleUpdateImage(data);
    }

    return jsonResponse({ success: false, error: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

/**
 * GET 요청 처리 — 데이터 조회/수정/삭제
 */
function doGet(e) {
  try {
    const action = e.parameter.action || 'list';

    switch (action) {
      case 'list':
        return handleList();
      case 'update':
        return handleUpdate(e.parameter);
      case 'delete':
        return handleDelete(e.parameter);
      case 'updateOrder':
        return handleUpdateOrder(e.parameter);
      case 'clearAll':
        return handleClearAll();
      case 'saveTabs':
        return handleSaveTabs(e.parameter);
      case 'loadTabs':
        return handleLoadTabs();
      default:
        return jsonResponse({ success: false, error: 'Unknown action: ' + action });
    }
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

/**
 * 이미지 업로드 처리
 */
function handleUpload(data) {
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const sheet = getOrCreateSheet(SHEET_NAME);

  const results = [];

  const items = data.items || [data];

  for (const item of items) {
    // base64 디코딩 및 Drive에 저장
    const base64Data = item.img_base64.split(',')[1] || item.img_base64;
    const mimeType = item.mimeType || 'image/png';
    const fileName = item.fileName || ('portfolio_' + Date.now() + '.png');

    const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), mimeType, fileName);
    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    const fileId = file.getId();
    const imgUrl = 'https://lh3.googleusercontent.com/d/' + fileId;

    // Sheets에 메타데이터 기록
    sheet.appendRow([
      item.id,
      imgUrl,
      fileId,
      item.caption || '',
      item.year || '',
      item.tag || '',
      item.url || '',
      item.isPc ? 'TRUE' : 'FALSE',
      item.isResponsive ? 'TRUE' : 'FALSE',
      item.isMobile ? 'TRUE' : 'FALSE',
      item.order || 0,
      item.isHidden ? 'TRUE' : 'FALSE',
      item.tabCategory || ''
    ]);

    results.push({
      id: item.id,
      img_url: imgUrl,
      driveFileId: fileId
    });
  }

  return jsonResponse({ success: true, results: results });
}

/**
 * 이미지 교체 처리
 */
function handleUpdateImage(data) {
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const sheet = getOrCreateSheet(SHEET_NAME);
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();

  const id = data.id;
  let rowIndex = -1;
  let oldDriveFileId = null;

  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === id) {
      rowIndex = i + 1; // 1-based
      oldDriveFileId = values[i][2]; // driveFileId column
      break;
    }
  }

  if (rowIndex === -1) {
    return jsonResponse({ success: false, error: 'Item not found: ' + id });
  }

  // 기존 Drive 파일 삭제
  if (oldDriveFileId) {
    try {
      DriveApp.getFileById(oldDriveFileId).setTrashed(true);
    } catch (e) { /* 이미 삭제된 경우 무시 */ }
  }

  // 새 이미지 업로드
  const base64Data = data.img_base64.split(',')[1] || data.img_base64;
  const mimeType = data.mimeType || 'image/png';
  const fileName = data.fileName || ('portfolio_' + Date.now() + '.png');

  const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), mimeType, fileName);
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  const fileId = file.getId();
  const imgUrl = 'https://lh3.googleusercontent.com/d/' + fileId;

  // Sheets 업데이트
  sheet.getRange(rowIndex, 2).setValue(imgUrl);      // img_url
  sheet.getRange(rowIndex, 3).setValue(fileId);       // driveFileId

  return jsonResponse({ success: true, img_url: imgUrl, driveFileId: fileId });
}

/**
 * 전체 목록 조회
 */
function handleList() {
  const sheet = getOrCreateSheet(SHEET_NAME);
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();

  if (values.length <= 1) {
    return jsonResponse({ success: true, items: [] });
  }

  const headers = values[0];
  const items = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    items.push({
      id: row[0],
      img_url: row[1],
      driveFileId: row[2],
      caption: row[3],
      year: row[4],
      tag: row[5],
      url: row[6],
      isPc: row[7] === 'TRUE' || row[7] === true,
      isResponsive: row[8] === 'TRUE' || row[8] === true,
      isMobile: row[9] === 'TRUE' || row[9] === true,
      order: Number(row[10]) || 0,
      isHidden: row[11] === 'TRUE' || row[11] === true,
      tabCategory: row[12]
    });
  }

  return jsonResponse({ success: true, items: items });
}

/**
 * 개별 항목 업데이트
 */
function handleUpdate(params) {
  const sheet = getOrCreateSheet(SHEET_NAME);
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  const headers = values[0];

  const id = params.id;
  const field = params.field;
  const value = params.value;

  // 컬럼 인덱스 찾기
  const colIndex = headers.indexOf(field);
  if (colIndex === -1) {
    // boolean 필드 매핑
    const fieldMap = {
      'isPc': 7, 'isResponsive': 8, 'isMobile': 9, 'isHidden': 11
    };
    var mappedCol = fieldMap[field];
    if (mappedCol === undefined) {
      return jsonResponse({ success: false, error: 'Unknown field: ' + field });
    }

    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === id) {
        sheet.getRange(i + 1, mappedCol + 1).setValue(value === 'true' ? 'TRUE' : (value === 'false' ? 'FALSE' : value));
        return jsonResponse({ success: true });
      }
    }
  } else {
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === id) {
        let finalValue = value;
        if (field === 'isPc' || field === 'isResponsive' || field === 'isMobile' || field === 'isHidden') {
          finalValue = (value === 'true' || value === true) ? 'TRUE' : 'FALSE';
        }
        sheet.getRange(i + 1, colIndex + 1).setValue(finalValue);
        return jsonResponse({ success: true });
      }
    }
  }

  return jsonResponse({ success: false, error: 'Item not found: ' + id });
}

/**
 * 항목 삭제
 */
function handleDelete(params) {
  const sheet = getOrCreateSheet(SHEET_NAME);
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  const id = params.id;

  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === id) {
      // Drive 파일 삭제
      const driveFileId = values[i][2];
      if (driveFileId) {
        try {
          DriveApp.getFileById(driveFileId).setTrashed(true);
        } catch (e) { /* 이미 삭제된 경우 무시 */ }
      }
      // Sheets 행 삭제
      sheet.deleteRow(i + 1);
      return jsonResponse({ success: true });
    }
  }

  return jsonResponse({ success: false, error: 'Item not found: ' + id });
}

/**
 * 순서 일괄 업데이트
 */
function handleUpdateOrder(params) {
  const sheet = getOrCreateSheet(SHEET_NAME);
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();

  const orderData = JSON.parse(params.orderData);
  // orderData = [{ id: '...', order: 0 }, { id: '...', order: 1 }, ...]

  for (const item of orderData) {
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === item.id) {
        sheet.getRange(i + 1, 11).setValue(item.order); // order column (11th, 1-based)
        break;
      }
    }
  }

  return jsonResponse({ success: true });
}

/**
 * 전체 데이터 초기화
 */
function handleClearAll() {
  const sheet = getOrCreateSheet(SHEET_NAME);
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();

  // Drive 파일들 삭제
  for (let i = 1; i < values.length; i++) {
    const driveFileId = values[i][2];
    if (driveFileId) {
      try {
        DriveApp.getFileById(driveFileId).setTrashed(true);
      } catch (e) { /* 무시 */ }
    }
  }

  // 헤더 제외 전체 삭제
  if (values.length > 1) {
    sheet.deleteRows(2, values.length - 1);
  }

  return jsonResponse({ success: true });
}

/**
 * 탭 설정 저장
 */
function handleSaveTabs(params) {
  const sheet = getOrCreateSheet(TABS_SHEET_NAME);
  const configJson = params.config;

  // 기존 데이터 삭제
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
  }

  sheet.appendRow([configJson]);
  return jsonResponse({ success: true });
}

/**
 * 탭 설정 불러오기
 */
function handleLoadTabs() {
  const sheet = getOrCreateSheet(TABS_SHEET_NAME);
  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    return jsonResponse({ success: true, config: null });
  }

  const config = sheet.getRange(2, 1).getValue();
  return jsonResponse({ success: true, config: config });
}

/**
 * JSON 응답 생성 (CORS 지원)
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
