const path = require('path');
const {app, BrowserWindow} = require('electron');
const debug = /--debug/.test(process.argv[2]);

if (process.mas) app.setName('Electron APIs');

let mainWindow = null;

// Initialize
function initialize() {
    makeSingleInstance();

    app.on('ready', () => {
        createWindow();
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow();
        }
    });
}

// Create Window
function createWindow() {
    const windowOptions = {
        height: 840,
        minWidth: 680,
        title: app.getName(),
        webPreferences: {
            nodeIntegration: true
        },
        width: 1080
    };

    if (process.platform === 'linux') {
        windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png');
    }

    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.loadURL(path.join('file://', __dirname, '/index.html'));

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
        mainWindow.webContents.openDevTools();
        mainWindow.maximize();
        require('devtron').install();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function makeSingleInstance () {
    if (process.mas) return;

    app.requestSingleInstanceLock();

    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus()
        }
    });
}

initialize();
