import { Component, OnInit, Input, Injectable } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { OrderService } from './order.service';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';
import { Order, OrderItem } from './order.model';
import { ErrorHandler } from '../app.error-handler';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
@Injectable()
export class OrderComponent implements OnInit {

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB', defaultChecked: true},
    {label: 'Cartão Refeição', value: 'REF'}
  ]

  constructor(private orderService: OrderService) {}

  ngOnInit() { }

  cartItems(): CartItem[]{
    return this.orderService.cartItems()
  }

  increaseQty(menu: MenuItem){
    this.orderService.increaseQty(menu)
  }

  decreaseQty(menu: MenuItem){
    this.orderService.decreaseQty(menu)
  }

  remove(cart: CartItem){
    this.orderService.remove(cart)
  }

  total(): number{
    return this.orderService.total()
  }

  checkOrder(order: Order){
    order.orderItem = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id)) 

    this.orderService.checkOrder(order).subscribe(
      (data) => {
        console.log(data)
        this.orderService.clear()
      }, ErrorHandler.handleError
    )
  }

}