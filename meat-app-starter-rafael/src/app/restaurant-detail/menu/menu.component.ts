import { Component, OnInit, Injectable } from '@angular/core';
import { MenuItem } from '../menu-item/menu-item.model';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'src/app/restaurants/restaurants.service';
import { ErrorHandler } from 'src/app/app.error-handler';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})

@Injectable()
export class MenuComponent implements OnInit {

  menuItems: MenuItem[]

  constructor(private service: RestaurantsService,
              private route: ActivatedRoute){}

  ngOnInit() {
    this.service
      .menuOfRestaurant(this.route.parent.snapshot.params['id']).subscribe(
        data => this.menuItems = data,
        ErrorHandler.handleError
    )
  }
}