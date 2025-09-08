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
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("employees");
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row[0].toString().trim() === username.trim() && row[1].toString().trim() === password.trim()) {
      return { success: true, username: row[0], employeeId: row[0], role: row[2] };
    }
  }
  return { success: false };
}

function recordCheckIn(employeeId, location, action, status) { 
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CheckInLog");

    const now = new Date();
    const thailandTime = Utilities.formatDate(now, "GMT+7", "yyyy-MM-dd HH:mm:ss");

    sheet.appendRow([
        employeeId,
        thailandTime,
        location,
        action,
        status,
    ]);
    return true;
}

function recordCheckOut(employeeId, location, action, status){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CheckInLog");
  
  const now = new Date();
  const thailandTime = Utilities.formatDate(now, "GMT+7", "yyyy-MM-dd HH:mm:ss");
  
  sheet.appendRow ([
    employeeId,
    thailandTime,
    location,
    action,
    status
  ]);
  return true;
}




