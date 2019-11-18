import { Route } from '@angular/compiler/src/core'
import { CanLoad, UrlSegment } from '@angular/router'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanLoad{
    canLoad(route: Route): boolean{
        console.log(route)
        return false
    }
 
}