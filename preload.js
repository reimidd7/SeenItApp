const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    'api', {
        saveShowsToFile: (shows) => ipcRenderer.invoke('save-shows-to-file', shows),
        loadShowsFromFile: () => ipcRenderer.invoke('load-shows-from-file')
    }
);
