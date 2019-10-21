import { CartItem } from './cart-item.model'
import { MenuItem } from '../menu-item/menu-item.model'
import { Injectable } from '@angular/core'
import { NotificationService } from 'src/app/messages/snackbar/notification.service'

@Injectable({
    providedIn: 'root'
  })
export class ShoppingCartService {

    carts: CartItem[] = []

    constructor(private notificationService: NotificationService){}

    clear() {
        this.carts = []
    }

    addItem(item: MenuItem) {
        let foundCart = this.carts.find((cart) => cart.menuItem.id === item.id)

        if (foundCart){
            this.increaseQty(foundCart)
        }else{
            this.carts.push(new CartItem(item))
        }

        this.notificationService.notify(`${item.name} adicionado com sucesso!`)
    }

    increaseQty(cart: CartItem){
        cart.quantity = cart.quantity + 1
    }

    removeItem(menu: MenuItem){
        let foundCart = this.carts.find((cart) => cart.menuItem.id === menu.id)
        
        if (foundCart){
            if (foundCart.quantity == 1){
                this.removeCart(foundCart)
            }else{
                this.decreaseQty(foundCart)
            }
        }
    }

    decreaseQty(cart: CartItem){
        cart.quantity = cart.quantity -1
    }

    removeCart(cart: CartItem){
        let foundCart
        if (!cart){
            foundCart = this.carts.find((cart) => cart.menuItem.id === cart.menuItem.id)
        }
        foundCart = cart
        
        if (foundCart){
            this.carts.splice(this.carts.indexOf(cart), 1)
        }
    }

    total(): number{
        return this.carts.map((item)=>item.value()).reduce((anterior, atual) => anterior + atual, 0)
    }

}