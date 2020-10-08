const { contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld(
  "api", {
    CheckSytemTheme: () =>
        ipcRenderer.invoke("ipc-system-theme")
            .then(result => result)
            .catch(err => console.log(err)),

    ChangeSystemTheme: (channel, listener) => {
      ipcRenderer.on("ipc-change-system-theme", (event, arg) =>
          listener(arg)
      );
    }
  }
);
