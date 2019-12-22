import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MEAT_API } from 'src/app/app.api';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: User

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn(): boolean{
    return this.user !== undefined
  }

  login(email: string, password: string): Observable<User>{
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // }

    return this.http.post<User>(
        MEAT_API + '/login', {email: email, password: password}).pipe(
          tap(user => this.user = user)
        )
  }
  logout(){
    this.user = undefined
  }

  handleLogin(path?: string){
    this.router.navigate(['/login', path || '/'])
  }
  
}
