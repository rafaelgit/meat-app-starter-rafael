import { Injectable } from '@angular/core';
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private cartService: ShoppingCartService ) {}

  cartItems(): CartItem[]{
    return this.cartService.carts
  }

  increaseQty(menu: MenuItem){
    this.cartService.addItem(menu)
  }

  decreaseQty(menu: MenuItem){
    this.cartService.removeItem(menu)
  }

  remove(cart: CartItem){
    this.cartService.removeCart(cart)
  }

  total(): number{
    return this.cartService.total()
  }

}