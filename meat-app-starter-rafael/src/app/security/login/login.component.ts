import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/messages/snackbar/notification.service';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
@Injectable()
export class LoginComponent implements OnInit {

  loginForm: FormGroup
 
  constructor(private fb: FormBuilder, private notification: NotificationService, private loginService: LoginService, private activeRoute: ActivatedRoute, private router: Router, private modal: NgbModal) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })
  }

  logar(){
    let email: string = this.loginForm.controls['email'].value
    let password: string = this.loginForm.controls['password'].value

    this.loginService.login('juliana@gmail.com', 'juliana123').subscribe(
      (data)=>{
        console.log(data)
      },
      (data) => {
        this.notification.notify(data.error.message)
      },
      () => this.router.navigate([this.activeRoute.snapshot.params['to'] || '/'])
    )
  }

}
