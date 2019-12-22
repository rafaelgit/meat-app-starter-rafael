import { CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Route } from '@angular/router'
import { Injectable } from '@angular/core'
import { LoginService } from '../security/login/login.service'

@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanLoad, CanActivate{

    constructor(private loginService: LoginService, private router: Router){}

    checkAuthentication(path: string): boolean{
        const logged = this.loginService.isLoggedIn()
        if (!logged){
            this.router.navigate(['login/'+path])
        }

        return logged
    }

    canLoad(route: Route): boolean{
        console.log("canLoad()")
        return this.checkAuthentication(route.path)
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routeState: RouterStateSnapshot): boolean{
        console.log("canActivate()")
        return this.checkAuthentication(activatedRoute.routeConfig.path)        
    }
 
}