import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html'
})
export class OrderSummaryComponent implements OnInit {

  rated: number

  constructor() { }

  ngOnInit() {}

  isRated(r){
    this.rated = r;
  }

}