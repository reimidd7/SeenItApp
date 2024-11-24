const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;

// Get user's desktop path for file storage
const desktopPath = path.join(require('os').homedir(), 'OneDrive', 'Desktop');
const showsFilePath = path.join(desktopPath, 'watched-shows.json');
console.log("OneDrive Desktop path:", desktopPath);

let mainWindow = null;

// creates the main window
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

// create window when electron is ready
app.whenReady().then(createWindow);

// quit app when window is closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// mac specific - dont need rn
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// handles saving shows to file
ipcMain.handle('save-shows-to-file', async (event, shows) => {
    try {
        // writes show data to file
        await fs.writeFile(showsFilePath, JSON.stringify(shows, null, 2));
        console.log('Saving to file:', showsFilePath);
        return { success: true };
    } catch (error) {
        console.error('Error saving shows to file:', error);
        return { success: false, error: error.message };
    }
});

// loads shows from file
ipcMain.handle('load-shows-from-file', async () => {
    try {
        // reads shows data from file
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
