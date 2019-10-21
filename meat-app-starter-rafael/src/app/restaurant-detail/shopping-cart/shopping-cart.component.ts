import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { MenuItem } from '../menu-item/menu-item.model';
import { CartItem } from './cart-item.model';
import { trigger, state, transition, animate, style, keyframes } from '@angular/animations';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  animations: [
    trigger('fadeItem', [
      state('ready', style({
        opacity: 1
      })),
      transition('void => ready', [
        animate('300ms 0s ease-in', keyframes([
          style({
            opacity: 0,
            transform: 'translateX(-30px)',
            offset: 0
          }),
          style({
            opacity: 0.8,
            transform: 'translateX(10px)',
            offset: 0.8
          }),
          style({
            opacity: 1,
            transform: 'translateX(0px)',
            offset: 1
          }),
        ]))
      ]),
      transition('ready => void', [
        animate('100ms 0s ease-out', keyframes([
          style({
            opacity: 1,
            transform: 'translateX(0px)',
            offset: 0
          }),
          style({
            opacity: 0,
            transform: 'translateX(-100px)',
            offset: 1
          })
        ]))
      ])
    ])
  ]
})

export class ShoppingCartComponent implements OnInit {

  fadeItemTrigger = 'ready'

  carts: CartItem[]
  constructor(private shoppingCartService: ShoppingCartService ) {}

  ngOnInit() {
    this.carts = this.shoppingCartService.carts
  }

  total(): number{
    return this.shoppingCartService.total()
  }

  clear(){
    this.shoppingCartService.clear()
  }

  removeItem(item: MenuItem){
    this.shoppingCartService.removeItem(item)
  }

  addItem(item: MenuItem, eventName: number){
    this.shoppingCartService.addItem(item)
  }

}