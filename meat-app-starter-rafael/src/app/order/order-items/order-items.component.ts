import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/restaurant-detail/shopping-cart/cart-item.model';
import { MenuItem } from 'src/app/restaurant-detail/menu-item/menu-item.model';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html'
})
export class OrderItemsComponent implements OnInit {

  @Input() carts: CartItem[]

  @Output() increaseQty = new EventEmitter<MenuItem>()
  @Output() decreaseQty = new EventEmitter<MenuItem>()
  @Output() remove = new EventEmitter<CartItem>()

  ngOnInit() {}

  emitIncreaseQty(menu: MenuItem){
    this.increaseQty.emit(menu)
  }

  emitDecreaseQty(menu: MenuItem){
    this.decreaseQty.emit(menu)
  }

  emitRemove(cart: CartItem){
    this.remove.emit(cart)
  }
}