import { Component, OnInit, Input } from '@angular/core';
import { RestaurantService } from '../restaurant.service';

export interface BasketElement {
  id: number,
  name: string,
  price: number,
  elements: number
}

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basket: BasketElement[] = [];

  constructor(private restaurantService: RestaurantService) { }

  basketPriceSum(){
    let sum = 0;
    for(let b of this.basket) sum += b.price * b.elements;
    return sum;
  }

  ngOnInit(): void {
    this.basket = this.restaurantService.getBasket();
  }

}
