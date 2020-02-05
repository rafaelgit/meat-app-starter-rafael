import { Component, Input, Output, EventEmitter, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-leave-modal',
  templateUrl: './order-leave-modal.component.html'
})

export class OrderLeaveModalComponent{

  @Input() showModal: boolean;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() cancelLabel: string;
  @Input() positiveLabel: string;

  @Output() hideModal = new EventEmitter
  @Output() closeEmitter: EventEmitter < ModalResult > = new EventEmitter < ModalResult > ();
  @Output() loadedEmitter: EventEmitter < OrderLeaveModalComponent > = new EventEmitter < OrderLeaveModalComponent > ();
  @Output() positiveLabelAction = new EventEmitter();

  // public onClose: Subject<boolean>;

  // constructor(private _bsModalRef: BsModalRef) { }
  constructor() { }

  ngOnInit() {
    // this.onClose = new Subject();
    this.showModal = false
    this.loadedEmitter.emit(this);
  } 

  hide() {
    // this.hideModal.emit()
    // this.showModal = false;
    this.closeEmitter.emit({
      action: ModalAction.POSITIVE
    });
  }

  positiveAction() {
    this.positiveLabelAction.emit(this);
    return false;
  }

  cancelAction() {
    // this.onClose.next(false)
    // this.hideModal.emit()
    // this._bsModalRef.hide()
    // this.showModal = false;
    // this.closeEmitter.emit({
    //   action: ModalAction.CANCEL
    // });
    // return false;
  }
}

export enum ModalAction { POSITIVE, CANCEL }

export interface ModalResult {
  action: ModalAction;
}