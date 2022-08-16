import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { date, eventInfo, DateStr, MonthStr } from 'primitive/eventID';
import { GlobalService } from '../service/global.service';
import { StoreService } from '../service/store.service';


@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  constructor(
    public gs: GlobalService,
    public store: StoreService
  ) { }
  
  eventList: eventInfo[] = [];
  weekDay: any[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  ngOnInit(): void {
    var getDataInterval = setInterval(() => {
      // console.log(`--->${this.gs.dataList}`);
      for (var i = 0; i < this.gs.dataList.length; i ++){
        for (var j = 0; j < this.gs.dataList[i].eventItem.length; j ++){
          this.eventList.push(this.gs.dataList[i].eventItem[j]);
        }
      }
      if (this.eventList != undefined) clearInterval(getDataInterval);
    }, 500);
  }

  //Count the number between the eventDate and current day
  countDate(dateInfo: date){
    const d_event = new Date(dateInfo.year + "-" + dateInfo.month + "-" + dateInfo.day);
    const d_tmp = new Date();
    const d_now = new Date(d_tmp.getFullYear() + "-" + (d_tmp.getMonth()+1) + "-" + d_tmp.getDate());
    // console.log(`--->${d_now}--${(d_event.valueOf()-d_now.valueOf())/(1000*60*60*24)}`);
    return (d_event.valueOf()-d_now.valueOf()) / (1000*60*60*24);
  }

}
