import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/security/login/login.service';
import { User } from 'src/app/security/login/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {}

  isLoggedIn(): boolean{
    return this.loginService.isLoggedIn()
  }

  user(): User{
    return this.loginService.user
  }

  login(){
    this.loginService.handleLogin(this.router.url)
  }

  logout(){
    this.loginService.logout()
  }

}