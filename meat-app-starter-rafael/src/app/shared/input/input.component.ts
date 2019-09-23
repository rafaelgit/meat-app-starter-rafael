import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import {NgModel, NgControl} from '@angular/forms'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() label: string
  @Input() errorMessage: string

  input: NgModel

  @ContentChild(NgModel, {static: false}) control: NgModel

  constructor() { }

  ngOnInit() { }

  ngAfterContentInit(){
    this.input = this.control

    if(this.input === undefined){
      throw new Error('Esse componente precisa ser usado com diretiva ngModel')
    }
  }

  hasSuccess(): boolean{
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean{
    return !this.input.valid && (this.input.dirty || this.input.touched)
  }

}
