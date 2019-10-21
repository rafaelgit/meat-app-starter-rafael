import {Component, OnInit} from '@angular/core';
import { NotificationService } from './notification.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { timer } from 'rxjs';
import { tap, switchMap, } from 'rxjs/operators';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  mensagem: string
  snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier.pipe(
      tap(message => {
        this.mensagem = message
        this.snackVisibility = 'visible'
      }),
      switchMap(() => timer(3000))
    ).subscribe(() => {
      this.snackVisibility = 'hidden'
    })
  }

}