import { Component, OnInit, Injectable } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { ErrorHandler } from '../app.error-handler';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { switchMap, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        'max-width': '0%',
      })),
      state('visible', style({
        opacity: 1,
        'max-width': '100%',
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})

@Injectable()
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'
  restaurantForm: FormGroup
  searchRestaurant: FormControl

  listaRestaurants: Restaurant[]

  constructor(private restaurantService: RestaurantsService, private fb: FormBuilder) { }
 
  ngOnInit() {
    this.searchRestaurant = this.fb.control('')
    this.restaurantForm = this.fb.group({
      searchRestaurant: this.searchRestaurant
    })

    this.searchRestaurant.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap((search)=>console.log(`q=${search}`)),
      switchMap((search) => this.restaurantService.restaurants(search)),
    ).subscribe((data) => {
      this.listaRestaurants = data
    }, ErrorHandler.handleError)

    this.restaurantService.restaurants('').subscribe(
      (data) => {
        this.listaRestaurants = data
      }, ErrorHandler.handleError
    )
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'visible' ? 'hidden' : 'visible'
  }
}