import { Component, OnInit } from '@angular/core';
import { GlobalState } from '../../../shared/global.state';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs = [];
  constructor(
    private _state: GlobalState
  ) {}

  ngOnInit() {
    this._state.subscribe('[Breadcrumbs] changed', (breadcrumbs) => {
      this.breadcrumbs = breadcrumbs;
    });
  }
}
