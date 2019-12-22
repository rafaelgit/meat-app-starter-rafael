import { CanDeactivate, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { OrderComponent } from './order.component';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class LeaveOrderGuard implements CanDeactivate<OrderComponent>{
 
    constructor (private modal: NgbModal){}

    canDeactivate(orderComponent: OrderComponent,
        activatedRoute: ActivatedRouteSnapshot,
        routerState: RouterStateSnapshot): boolean{
        if (!orderComponent.isOrderCompleted()){
            return window.confirm('Deseja desistir da compra?')
            // this.modal.open(OrderLeaveModalComponent).result.then(
            //     confirmar => {
            //         return true
            //     },
            //     fechar => {
            //         return false
            //     }
            // )
            return false
        }else{
            return false
        }
    }
}