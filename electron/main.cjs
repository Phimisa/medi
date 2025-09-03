const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;
const { autoUpdater } = require("electron-updater"); // <-- THÊM DÒNG NÀY

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173/");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      `file://${path.join(__dirname, "../dist/public/index.html")}`
    );
  }

  // Gửi thông báo từ main process sang render process (nếu cần)
  // để hiển thị thông tin cập nhật cho người dùng
  autoUpdater.on("checking-for-update", () => {
    mainWindow.webContents.send("update_status", "Đang kiểm tra cập nhật...");
  });
  autoUpdater.on("update-available", (info) => {
    mainWindow.webContents.send("update_status", "Đã tìm thấy bản cập nhật mới. Đang tải xuống...");
  });
  autoUpdater.on("update-not-available", (info) => {
    mainWindow.webContents.send("update_status", "Không có bản cập nhật mới.");
  });
  autoUpdater.on("error", (err) => {
    mainWindow.webContents.send("update_status", `Lỗi khi cập nhật: ${err}`);
  });
  autoUpdater.on("download-progress", (progressObj) => {
    let log_message = `Đang tải: ${Math.round(progressObj.percent)}%`;
    mainWindow.webContents.send("update_status", log_message);
  });
  autoUpdater.on("update-downloaded", (info) => {
    mainWindow.webContents.send(
      "update_status",
      "Đã tải xong bản cập nhật. Ứng dụng sẽ tự khởi động lại để cài đặt."
    );
    // Sau khi tải xong, tự động cài đặt bản cập nhật
    autoUpdater.quitAndInstall();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // Kiểm tra cập nhật khi ứng dụng đã sẵn sàng và ở chế độ production
  if (!isDev) {
    autoUpdater.checkForUpdatesAndNotify();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});