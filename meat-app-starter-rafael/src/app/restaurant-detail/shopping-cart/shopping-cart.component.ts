import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { MenuItem } from '../menu-item/menu-item.model';
import { CartItem } from './cart-item.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})

export class ShoppingCartComponent implements OnInit {

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
