import { ObservableMedia } from '@angular/flex-layout';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() public items;
  public nbCols = 5;
  constructor(private observableMedia: ObservableMedia) { }

  ngOnInit() {
    this.updateGrids();
    this.observableMedia.subscribe((data) => {
      this.updateGrids();
    });
  }
  private updateGrids(): void {

    if (this.observableMedia.isActive('xl')) {
      this.nbCols = 5;
    } else if (this.observableMedia.isActive('lg')) {
      this.nbCols = 5;
    } else if (this.observableMedia.isActive('md')) {
      this.nbCols = 5;
    } else if (this.observableMedia.isActive('sm')) {
      this.nbCols = 3;
    } else if (this.observableMedia.isActive('xs')) {
      this.nbCols = 1;
    }
  }
}
