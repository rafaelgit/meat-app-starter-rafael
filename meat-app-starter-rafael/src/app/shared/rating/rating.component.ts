import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter} from '@angular/core'

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  rates = ['1', '2', '3', '4', '5']
  rate: number 
  previousRate: number
  @Output() rated = new EventEmitter<number>()

  constructor() { }

  ngOnInit() {
    this.rate = 0
    this.previousRate = 0
  }

  setRate(r: number){
    this.rate = r
    this.previousRate = r
    this.rated.emit(r)
  }

  setTemporaryRate(r: number){
    this.rate = r
  }

  clearTemporaryRate(r: number){
    this.rate = this.previousRate
  }

  markRate(r: number){
    return r <= this.rate
  }
  unmarkRate(r: number){
    return r > this.rate
  }

}
