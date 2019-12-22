import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-leave-modal',
  templateUrl: './order-leave-modal.component.html'
})
export class OrderLeaveModalComponent {

  constructor(public modal: NgbActiveModal) { }
}
