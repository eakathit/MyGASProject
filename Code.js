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

function recordCheckIn(user, displayName, location, action, status) { 
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CheckInLog");

    const now = new Date();
    const dateStr = Utilities.formatDate(now, "GMT+7", "dd/MM/yyyy");
    const timeStr = Utilities.formatDate(now, "GMT+7", "HH:mm:ss");

    sheet.appendRow([
        user,         // User
        displayName,  // displayName
        dateStr,
        timeStr,
        location,
        action,
        status
    ]);
    return true;
}

function recordCheckOut(user, displayName, location, action, status) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CheckInLog");

    const now = new Date();
    const dateStr = Utilities.formatDate(now, "GMT+7", "dd/MM/yyyy");
    const timeStr = Utilities.formatDate(now, "GMT+7", "HH:mm:ss");

    sheet.appendRow([
        user,         // User
        displayName,  // displayName
        dateStr,
        timeStr,
        location,
        action,
        status
    ]);
    return true;
}

function getCheckStatus(user) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CheckInLog");
  const data = sheet.getDataRange().getValues();
  const today = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy");

  let checkedIn = false;
  let checkedOut = false;

  for (let i = 1; i < data.length; i++) {
    const rowUser = data[i][0];   // column User
    const rowDate = data[i][2];   // วัน (ถ้า column 2 = date)
    const rowAction = data[i][5]; // action

    if (rowUser === user && rowDate === today) {
      if (rowAction === "เช็คอิน") checkedIn = true;
      if (rowAction === "เช็คเอาท์") checkedOut = true;
    }
  }

  return { checkedIn, checkedOut };
}
