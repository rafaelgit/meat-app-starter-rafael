import { CartItem } from './cart-item.model'
import { MenuItem } from '../menu-item/menu-item.model'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
  })
export class ShoppingCartService {

    carts: CartItem[] = []

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
    }

    private increaseQty(cart: CartItem){
        cart.quantity = cart.quantity + 1
    }

    private removeItem(menu: MenuItem){
        let foundCart = this.carts.find((cart) => cart.menuItem.id === menu.id)
        
        if (foundCart){
            if (foundCart.quantity == 1){
                this.removeCart(foundCart)
            }else{
                this.decreaseQty(foundCart)
            }
        }
    }

    private decreaseQty(cart: CartItem){
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