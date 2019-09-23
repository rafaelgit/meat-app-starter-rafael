import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MenuItem } from './menu-item.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent implements OnInit {

  @Output() add = new EventEmitter()
  @Input() menu: MenuItem

  constructor() { }

  ngOnInit() {}

  emitAddEvent(){
    this.add.emit()
  }

}