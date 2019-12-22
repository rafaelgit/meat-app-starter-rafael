import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { FormControlName } from '@angular/forms'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {
  
  @Input() label: string
  @Input() errorMessage: string
  @Input() showTip: true
  @Input() value: string

  input: FormControlName

  @ContentChild(FormControlName, {static: false}) control: FormControlName

  constructor() { }

  ngOnInit() { }

  ngAfterContentInit(){
    this.input = this.control
    this.input.control.setValue(this.value)

    if(this.input === undefined){
      throw new Error('Esse componente precisa ser usado com diretiva formControlName')
    }
  }

  hasSuccess(): boolean{
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  deuErroCaraio(): boolean{
    return !this.input.valid && (this.input.dirty || this.input.touched)
  }

}
