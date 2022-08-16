import { Injectable } from "@angular/core";
import { GlobalService } from "./global.service";
import { IpcRenderer } from "electron";

const path = require('path');

@Injectable()

export class StoreService {
  private ipc!: IpcRenderer;
  constructor(
    public gs: GlobalService,
  ){}

  dPath: string = "";
  fileName: string = "dayCounter.json";
  saveFile(data: any){
    try {
        // this.dPath = this.gs.getPath + "/" + this.fileName;
        this.dPath = "test.json";
        console.log(`[store]Save file ${this.dPath}.`);
        this.ipc = window.require('electron').ipcRenderer;
        this.ipc.send("SAVE_FILE", [this.dPath, JSON.stringify(data, null, 2)]);
        // fs.writeFileSync(this.dPath, JSON.stringify(data));
    } catch (error) {
        console.log(`[store]Save ${this.dPath}. error:${error}`);
    }
  }

  loadFile(){
    try {
        //this.dPath = this.gs.getPath + "/" + this.fileName;
        this.dPath = "test.json";
        console.log(`[store]Load file ${this.dPath}.`);
        this.ipc = window.require('electron').ipcRenderer;
        this.ipc.send("LOAD_FILE", this.dPath);
        this.ipc.on('RETURN_FILE', (event, arg) => {
            this.gs.dataList = arg;
        });
    } catch (error) {
        console.log(`[store]Load ${this.dPath}. error:${error}`);
    }
  }

}