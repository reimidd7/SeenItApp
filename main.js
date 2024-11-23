const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;

// Get user's desktop path for file storage
const desktopPath = path.join(require('os').homedir(), 'OneDrive', 'Desktop');
const showsFilePath = path.join(desktopPath, 'watched-shows.json');
console.log("OneDrive Desktop path:", desktopPath);


let mainWindow = null;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
        
    });
    // In development, load from webpack dev server
    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
    }
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// IPC Handlers for file operations
ipcMain.handle('save-shows-to-file', async (event, shows) => {
    try {
        await fs.writeFile(showsFilePath, JSON.stringify(shows, null, 2));
        console.log('Saving to file:', showsFilePath);
        return { success: true };
    } catch (error) {
        console.error('Error saving shows to file:', error);
        return { success: false, error: error.message };
    }
});

ipcMain.handle('load-shows-from-file', async () => {
    try {
        const data = await fs.readFile(showsFilePath, 'utf8');
        console.log('LOADING FROM FILE:', showsFilePath);
        return { success: true, shows: JSON.parse(data) };
    } catch (error) {
        if (error.code === 'ENOENT') {
            return { success: true, shows: [] };
        }
        console.error('Error loading shows from file:', error);
        return { success: false, error: error.message };
    }
});
