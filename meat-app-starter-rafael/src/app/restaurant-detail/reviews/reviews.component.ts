import { Component, OnInit, Injectable } from '@angular/core';
import { RestaurantsService } from 'src/app/restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { Review } from './review/review.model';
import { ErrorHandler } from 'src/app/app.error-handler';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html'
})

@Injectable()
export class ReviewsComponent implements OnInit {

  reviews: Review[]

  constructor(private restaurantService: RestaurantsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.restaurantService.reviewsOfRestaurant(this.route.parent.snapshot.params['id']).subscribe(
      result => this.reviews = result,
      ErrorHandler.handleError
    )
  }

}
