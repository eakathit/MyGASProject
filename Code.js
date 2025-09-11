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
    const sheetUsername = row[0].toString().trim().toLowerCase(); // User
    const sheetPassword = row[1].toString().trim();               // Password

    if (sheetUsername === username.toLowerCase() && sheetPassword === password) {
      return {
        success: true,
        user: row[0].toString().trim(),        // ส่ง User กลับมา
        displayName: row[3].toString().trim(), // ส่ง DisplayName กลับมา (ตรวจสอบ index ให้ตรงชีท)
        role: row[2] ? row[2].toString().trim() : "" // เผื่อใช้ role ภายหลัง
      };
    }
  }
  return { success: false };
}


function recordCheckIn(user, displayName, location, action, status) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CheckInLog");
  const now = new Date();
  
  sheet.appendRow([
    user,
    displayName,
    Utilities.formatDate(now, "Asia/Bangkok", "yyyy-MM-dd"), // ✅ บันทึกวันที่
    Utilities.formatDate(now, "Asia/Bangkok", "HH:mm:ss"),   // ✅ บันทึกเวลา
    location,
    action,
    status
  ]);
}


function recordCheckOut(user, displayName, location, action, status) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CheckInLog");
  const now = new Date();
  
  sheet.appendRow([
    user,
    displayName,
    Utilities.formatDate(now, "Asia/Bangkok", "yyyy-MM-dd"),
    Utilities.formatDate(now, "Asia/Bangkok", "HH:mm:ss"),
    location,
    action,
    status
  ]);
}


function getCheckStatus(employeeId) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CheckInLog");
  const data = sheet.getDataRange().getValues();
  const today = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy");

  let checkedIn = false;
  let checkedOut = false;

  for (let i = 1; i < data.length; i++) {
    const rowEmployee = data[i][0];
    const rowDate = data[i][1]; // วันใน Sheet
    const rowAction = data[i][4];

    if (rowEmployee === employeeId && rowDate === today) {
      if (rowAction === "เช็คอิน") checkedIn = true;
      if (rowAction === "เช็คเอาท์") checkedOut = true;
    }
  }
  return { checkedIn, checkedOut };
}

function submitDailyReport(user, displayName, morningPlan, eveningSummary) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DailyReport");
  const now = new Date();
  
  // เพิ่มข้อมูลลง sheet
  sheet.appendRow([
    Utilities.formatDate(now, "Asia/Bangkok", "dd-MM-yyyy"), 
    user,     
    displayName,
    morningPlan,
    eveningSummary
  ]);
  
  return "บันทึกเรียบร้อยแล้ว!";
}
