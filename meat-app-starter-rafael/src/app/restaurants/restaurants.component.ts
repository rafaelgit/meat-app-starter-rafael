import { Component, OnInit, Injectable } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { ErrorHandler } from '../app.error-handler';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html'
})

@Injectable()
export class RestaurantsComponent implements OnInit {

  listaRestaurants: Restaurant[]

  constructor(private restaurantService: RestaurantsService) { }
 
  ngOnInit() {
    this.restaurantService.restaurants().subscribe(
      (data) => {
        this.listaRestaurants = data
      }, ErrorHandler.handleError
    )
  }
}