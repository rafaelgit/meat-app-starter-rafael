import {EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifier = new EventEmitter()

  notify(message: String){
    this.notifier.emit(message)
  }
}
