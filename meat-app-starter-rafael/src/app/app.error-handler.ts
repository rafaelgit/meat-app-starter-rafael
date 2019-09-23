import { HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs';

export class ErrorHandler{
    static handleError(error: HttpErrorResponse | any){
        let errorMessage: string

        if (error instanceof HttpErrorResponse){
            errorMessage = `Erro ${error.status} ao acessar URL ${error.url} - ${error.statusText}`
        }else{
            errorMessage = error.toString()
        }

        console.log(errorMessage)
        return Observable.throw(errorMessage)
    }
}