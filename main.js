const { mainReloader, rendererReloader } = require(
    'electron-hot-reload'
);
const { app, BrowserWindow } = require('electron');
const path = require('path');
const active = 'molecule-browser';

mainReloader(path.join(app.getAppPath(), 'main.js'));
rendererReloader(path.join(app.getAppPath(), 'dist', `${active}.js`));


function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile(`./dist/${active}.html`);
}

app.on('ready', createWindow);
