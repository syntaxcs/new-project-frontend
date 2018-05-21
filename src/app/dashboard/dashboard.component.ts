import { Component, OnInit } from '@angular/core';
import { GlobalState } from '../shared/global.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public _menus = [
    {
      title: 'ข้อมูลพื้นฐาน',
      name: 'manage-basic',
      items:
        [
          {
            icon: 'assets/images/icon.png',
            title: 'ยารักษา/โรค',
            url: '/basic-data/disease'
          },
        
        ]
    },
  ];

  constructor(
    private _state: GlobalState,
  ) { }

  ngOnInit() {
    this._state.notifyDataChanged('[Breadcrumbs] changed', [{ title: 'หน้าแรก' }]);
  }
  get menus() {
    return this._menus;
  }
}
