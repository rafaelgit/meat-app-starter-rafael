import { CanDeactivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { OrderComponent } from './order.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { OrderLeaveModalComponent } from './order-leave-modal/order-leave-modal.component';

@Injectable({
    providedIn: 'root'
})
export class LeaveOrderGuard implements CanDeactivate<OrderComponent>{
 
    constructor (private modalService: BsModalService){}

    canDeactivate(orderComponent: OrderComponent,
        activatedRoute: ActivatedRouteSnapshot,
        routerState: RouterStateSnapshot): boolean{
        if (!orderComponent.isOrderCompleted()){
            // const subject = new Subject<boolean>()
            // const modal = this.modalService.show(OrderLeaveModalComponent, {'class': 'modal-dialog-primary'})
            // modal.content.subject = subject
            // return subject.asObservable()
            // orderComponent.showModal(function(){
            //     console.log("teste")
            //     return false;
            // })
            // return window.confirm('Deseja desistir da compra?')
            this.modalService.show(OrderLeaveModalComponent);

            // (<OrderLeaveModalComponent>modal.content).onClose.subscribe(result => {
            //     return true
            // })

            // subscribe(response=>){
            // }
            // return false
        }else{
            // return false
            return null
        }
    }
}