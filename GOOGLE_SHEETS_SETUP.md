# Hướng dẫn Setup Google Sheets cho RSVP Form

## Bước 1: Tạo Google Sheet

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo một spreadsheet mới
3. Đặt tên cho sheet, ví dụ: "Wedding RSVP Responses"
4. Tạo header row với các cột:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Phone`
   - D1: `Message`
   - E1: `Attendance`

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheet, vào **Extensions** > **Apps Script**
2. Xóa code mặc định và paste code sau:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.phone || "",
      data.message || "",
      data.attendance || "",
    ];

    // Append the row to the sheet
    sheet.appendRow(rowData);

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ status: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function
function doGet() {
  return ContentService.createTextOutput(
    "RSVP Form API is working!"
  ).setMimeType(ContentService.MimeType.TEXT);
}
```

3. Lưu project (Ctrl + S hoặc File > Save)
4. Đặt tên project: "Wedding RSVP API"

## Bước 3: Deploy Apps Script

1. Click nút **Deploy** > **New deployment**
2. Click vào icon ⚙️ (settings) bên cạnh "Select type"
3. Chọn **Web app**
4. Cấu hình:
   - **Description**: Wedding RSVP Form Handler
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Authorize the app khi được yêu cầu
7. Copy **Web app URL** (sẽ có dạng: `https://script.google.com/macros/s/...`)

## Bước 4: Cập nhật Code Website

1. Mở file `app/components/RSVP.jsx`
2. Tìm dòng:
   ```javascript
   const response = await fetch("YOUR_GOOGLE_SCRIPT_URL", {
   ```
3. Thay `YOUR_GOOGLE_SCRIPT_URL` bằng URL bạn copy ở Bước 3
4. Save file

## Bước 5: Test

1. Chạy website: `npm run dev`
2. Điền form và submit
3. Kiểm tra Google Sheet để xem dữ liệu có được ghi vào không

## Troubleshooting

### Lỗi CORS

- Sử dụng `mode: "no-cors"` trong fetch (đã có trong code)
- Apps Script tự động xử lý CORS khi deploy as "Anyone"

### Không có dữ liệu trong Sheet

- Kiểm tra URL có đúng không
- Kiểm tra authorization của Apps Script
- Xem logs trong Apps Script: **Executions** tab

### Lỗi Permission

- Chắc chắn "Execute as" = "Me"
- Chắc chắn "Who has access" = "Anyone"
- Re-authorize app nếu cần

## Format dữ liệu lưu vào Sheet

| Timestamp           | Name         | Phone      | Message              | Attendance |
| ------------------- | ------------ | ---------- | -------------------- | ---------- |
| 2025-10-05T10:30:00 | Nguyễn Văn A | 0123456789 | Chúc mừng hạnh phúc! | yes        |
| 2025-10-05T11:15:00 | Trần Thị B   | 0987654321 | Chúc vui vẻ!         | no         |

## Attendance Values

- `yes` = Tôi sẽ đến
- `no` = Rất tiếc, tôi không thể đến
- `maybe` = Tôi chưa chắc chắn
- (empty) = Chưa chọn

## Security Notes

- Apps Script URL là public nhưng chỉ accept POST requests
- Không có sensitive data được store
- Data chỉ accessible bởi owner của Google Sheet
- Có thể thêm rate limiting nếu cần

## Advanced: Rate Limiting (Optional)

Nếu muốn giới hạn spam, thêm vào Apps Script:

```javascript
function doPost(e) {
  try {
    // Check if same name submitted within last 5 minutes
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    const lastRows = sheet
      .getRange(sheet.getLastRow() - 10, 1, 10, 5)
      .getValues();

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const isDuplicate = lastRows.some(
      (row) => row[1] === data.name && new Date(row[0]) > fiveMinutesAgo
    );

    if (isDuplicate) {
      return ContentService.createTextOutput(
        JSON.stringify({
          status: "error",
          message: "Bạn đã gửi lời chúc rồi. Vui lòng đợi 5 phút.",
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // ... rest of the code
  } catch (error) {
    // ...
  }
}
```
