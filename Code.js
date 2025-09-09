function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('ระบบลงเวลา')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
// โหลดหน้า child page
function getPage(pageName) {
  return HtmlService.createHtmlOutputFromFile(pageName).getContent();
}
// helper สำหรับ include
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ฟังก์ชันตรวจสอบ login
function checkLogin(username, password) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('employees'); // ชื่อ Sheet ต้องตรง
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) { // ข้าม header
    const row = data[i];
    const sheetUsername = row[0].toString().trim().toLowerCase();
    const sheetPassword = row[1].toString().trim();

    if (sheetUsername === username.toLowerCase() && sheetPassword === password) {
      return {
        success: true,
        username: row[0].trim(),
        displayName: row[3].trim()
      };
    }
  }
  return { success: false };
}


function recordCheckIn(displayName, location, action, status) { 
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CheckInLog");

    const now = new Date();
    const thailandTime = Utilities.formatDate(now, "GMT+7", "yyyy-MM-dd HH:mm:ss");

    sheet.appendRow([
        displayName,
        thailandTime,
        location,
        action,
        status,
    ]);
    return true;
}

function recordCheckOut(displayName, location, action, status){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CheckInLog");
  
  const now = new Date();
  const thailandTime = Utilities.formatDate(now, "GMT+7", "yyyy-MM-dd HH:mm:ss");
  
  sheet.appendRow ([
    displayName,
    thailandTime,
    location,
    action,
    status
  ]);
  return true;
}




