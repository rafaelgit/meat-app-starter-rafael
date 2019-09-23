import { Restaurant } from './restaurant/restaurant.model'
import { HttpClient } from '@angular/common/http';
import { MEAT_API } from '../app.api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../restaurant-detail/reviews/review/review.model';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

    constructor(private http: HttpClient){}

    restaurants(): Observable<Restaurant[]> {
      return this.http
        .get<Restaurant[]>(MEAT_API + '/restaurants')
    }

    restaurantById(id: string): Observable<Restaurant>{
      return this.http
        .get<Restaurant>(MEAT_API + '/restaurants/' + id)
    }

    reviewsOfRestaurant(id: string): Observable<Review[]>{
      return this.http
      .get<Review[]>(MEAT_API + '/restaurants/' + id + '/reviews')
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]>{
      return this.http
      .get<MenuItem[]>(MEAT_API + '/restaurants/' + id + '/menu')
    }
  }