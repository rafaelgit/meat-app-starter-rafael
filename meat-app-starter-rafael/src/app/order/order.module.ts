import { NgModule } from '@angular/core';
import { OrderComponent } from './order.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { LeaveOrderGuard } from './order-leave.guard';

const ROUTES: Routes = [
  {path: '', component: OrderComponent, canDeactivate: [LeaveOrderGuard]}
]

@NgModule({
  declarations: [OrderComponent, OrderItemsComponent],
  imports: [SharedModule, RouterModule.forChild(ROUTES)]
})
export class OrderModule { }