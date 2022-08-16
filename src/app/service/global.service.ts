import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { ElectronService } from 'ngx-electron';
import { IpcRenderer, ipcRenderer } from 'electron';
import { eventInfo, cataloguetList, date, eventProfileList } from 'primitive/eventID';
import { DisplayMode } from 'primitive/displayMode-enum';

export class GlobalService{
    private ipc!: IpcRenderer;
    es: ElectronService = new ElectronService();
    isMax: boolean = false;
    currentMode: string = "All";
    storePath: string = "";
    eventProfile!: eventProfileList;
    dataList!: any;
    displayMode: DisplayMode = 0;

    constructor(){
    }

    get getPath(){
      return this.storePath;
    }

    setStorePath(type: string) {
      console.log('[GS]Get Path!');
      this.ipc = window.require('electron').ipcRenderer;
      this.ipc.send('GET_PATH', type);
      this.ipc.on('RETURN_PATH', (event, arg) => {
        this.storePath = arg;
        // console.log(`===>${this.storePath}`);
      })
    }

    windowClose() {
      console.log('[GS]Close App !');
      this.ipc = window.require('electron').ipcRenderer;
      this.ipc.send('CLOSE_APP');
    }

    windowRestoreOrMaximize() {
      console.log('[GS]Restore or Maxmize App !');
      this.ipc = window.require('electron').ipcRenderer;
      this.ipc.send('RESOTRE_MAXIMIZIE_WIN');
    }

    windowMinimize() {
      console.log('[GS]Minimize App !');
      this.ipc = window.require('electron').ipcRenderer;
      this.ipc.send('MINIMIZE_WIN');
    }

    setEventProfile(data: any) {
      this.eventProfile = data;
    }
}