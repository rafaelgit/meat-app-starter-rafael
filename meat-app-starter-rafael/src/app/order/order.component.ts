import { Component, OnInit, Input, Injectable, Output, EventEmitter } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { OrderService } from './order.service';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';
import { Order, OrderItem } from './order.model';
import { ErrorHandler } from '../app.error-handler';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { ModalAction } from './order-leave-modal/order-leave-modal.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
@Injectable({
  providedIn: 'root'
})
export class OrderComponent implements OnInit {

  isExibeModal: boolean = false
  tituloModal: string = "Deseja desistir da compra?"

  userForm: FormGroup

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]

  orderId: string

  constructor(private orderService: OrderService, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      emailConfirmation: this.fb.control('', [Validators.required]),
      address: this.fb.group({
        address: this.fb.control('', [Validators.required, Validators.minLength(5)]),
        number: this.fb.control('', [Validators.required]),
        complement: this.fb.control('', [Validators.required])
      }),
      paymentOption: this.fb.control('', [Validators.required]), 
    }, {validators: [OrderComponent.validarEmail, OrderComponent.validarEmail]})
  }

  static validarEmail(group: AbstractControl): {[key: string]: boolean}{
    const email = group.get("email")
    const emailConfirmation = group.get("emailConfirmation")

    if (!email || !emailConfirmation){
      return undefined
    }

    if (email.value !== emailConfirmation.value){
      return {emailsNotMatch: true}
    }

    return undefined
  }
  
  cartItems(): CartItem[]{
    return this.orderService.cartItems()
  }

  increaseQty(menu: MenuItem){
    this.orderService.increaseQty(menu)
    this.router.navigate(['order/summary'])
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

  isOrderCompleted(): boolean{
    return this.orderId !== undefined
  }

  checkOrder(order: Order){
    order.orderItem = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id)) 

    this.orderService.checkOrder(order)
      .pipe(
        tap(orderId => {
          this.orderId = orderId
        })
      ).subscribe(
        (data) => {
          this.router.navigate(['summary'])
          this.orderService.clear()
        }, ErrorHandler.handleError
      )
  }

  showModal(){
    this.isExibeModal = true
  }

  hideModal(){
    this.isExibeModal = false
  }

  fechar(event: ModalAction){
    let parseEvent = ModalAction[event]
    // if (parseEvent === ModalAction.POSITIVE){
    //   window.alert('Positivo')
    // }else if (event === ModalAction.CANCEL){
    //   window.alert('Cancelado')
    // }
  }

}