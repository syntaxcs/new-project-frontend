import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button-card-title',
  templateUrl: './button-card-title.component.html',
  styleUrls: ['./button-card-title.component.scss']
})
export class ButtonCardTitleComponent implements OnInit {
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

}
