import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../service/global.service';
import { StoreService } from '../service/store.service';
import { app } from 'electron';
import { eventInfo, cataloguetList, date, eventProfileList } from 'primitive/eventID';
import { DisplayMode } from 'primitive/displayMode-enum';

const path = require('path-browserify');


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [GlobalService, StoreService]
})


export class HomeComponent implements OnInit {
  
  title: string = "DayCounter";
  clickHam: boolean = false;
  constructor(
    public gs: GlobalService,
    public store: StoreService
  ) {}

  ngOnInit(): void {
    var hambugerIcon;
    hambugerIcon = document.getElementById("hambugerIcon");
    hambugerIcon?.addEventListener('click', (event) => {
      this.clickHam = !this.clickHam;
    });
    // Following parameters can be used for getPath: 'home' | 'appData' | 'userData' | 'cache' | 'temp' | 'module' | 'desktop' |
    // 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps'
    this.gs.setStorePath("documents");
    this.store.loadFile();
  }

  getTitleName(){
    if (this.gs.currentMode != "All") return this.title+"-"+this.gs.currentMode;
    else return this.title;
  }


  closeWin(){
    this.gs.windowClose();
  }

  maximizeWin(){
    this.gs.windowRestoreOrMaximize();
  }

  minimizeWin(){
    this.gs.windowMinimize();
  }

  addEvent() {
    this.gs.displayMode = DisplayMode.AddEvent;
  }

  addEventTest() {
    var d1: date = {
      year: 2022,
      month: 5,
      day: 6,
      date: ''
    };

    var d2: date = {
      year: 2022,
      month: 5,
      day: 7,
      date: ''
    };
    
    var cat1: cataloguetList = {
      catalogueName: 'School',
      catalogueTheme: 'black',
      itemLength: 0,
      eventItem: []
    };

    var cat2: cataloguetList = {
      catalogueName: 'Home',
      catalogueTheme: 'pink',
      itemLength: 0,
      eventItem: []
    };

    var eS: eventInfo = {
      eventName: 'abc',
      eventDate: d1,
      eventComment: 'Hi!',
      eventCatalogue: 'School',
      remindDay: 0
    };
    cat1.eventItem.push(eS);

    var eS: eventInfo = {
      eventName: 'def',
      eventDate: d2,
      eventComment: 'HiYo!',
      eventCatalogue: 'School',
      remindDay: 0
    };
    cat1.eventItem.push(eS);
    cat1.itemLength = cat1.eventItem.length;

    var eH: eventInfo = {
      eventName: 'abc',
      eventDate: d1,
      eventComment: 'Hi!',
      eventCatalogue: 'Home',
      remindDay: 0
    };
    cat2.eventItem.push(eH);

    var eH: eventInfo = {
      eventName: 'def',
      eventDate: d2,
      eventComment: 'HiYo!',
      eventCatalogue: 'Home',
      remindDay: 0
    };
    cat2.eventItem.push(eH);
    cat2.itemLength = cat2.eventItem.length;

    var dataList: cataloguetList[]=[];
    dataList.push(cat1);
    dataList.push(cat2);
    console.log(dataList)
    let test = {
      name: "abc",
      age: 23,
      gender: "M"
    }
    this.store.saveFile(dataList);
  }

  readEvent() {
    this.store.loadFile();
    console.log(`${this.gs.dataList}`)
  }

  ngDestroy(){
    var hambuger;
    hambuger = document.getElementById("hambugerIcon");
    hambuger?.removeAllListeners;
  }

  showDataList() {
    for (var i = 0; i < this.gs.dataList.length; i ++){
      console.log(`-->${this.gs.dataList[i]}`);
    }
  }
}
