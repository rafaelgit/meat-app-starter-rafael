import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MenuItem } from './menu-item.model';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('fadeMenu', [
      state('ready', style({
        opacity: 1
      })),
      transition('void => ready', [
        style({
          opacity: 0,
          transform: 'translateY(-20px)'
        }),
        animate('500ms 0s ease-in')
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  fadeMenuTrigger = 'ready'

  @Output() add = new EventEmitter()
  @Input() menu: MenuItem

  constructor() { }

  ngOnInit() {}

  emitAddEvent(){
    this.add.emit()
  }

}