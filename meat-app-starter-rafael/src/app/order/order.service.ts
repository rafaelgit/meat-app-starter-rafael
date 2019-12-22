import { Injectable } from '@angular/core';
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MEAT_API } from '../app.api';
import { Order } from './order.model';
import { LoginService } from '../security/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private cartService: ShoppingCartService, private http: HttpClient, private loginService: LoginService) {}

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

  clear(){
    this.cartService.clear()
  }

  checkOrder(order: Order): Observable<string>{
    let headers = new HttpHeaders()
    if (this.loginService.isLoggedIn()){
      headers = headers.set('Authorization', 'Bearer ' + this.loginService.user.accessToken)
    }

    return this.http.post<string>(
      MEAT_API + '/orders', order, {headers: headers})
  }

}