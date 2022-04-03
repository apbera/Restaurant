import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { dishes } from '../dishes';
import { RestaurantService } from '../restaurant.service';
import { Router } from '@angular/router';
import { BasketElement } from '../basket/basket.component';

export {Dish};

interface Dish {
  key?: string,
  id: number,
  name: string,
  cuisine: string,
  type: string,
  category: string,
  ingridients: string,
  maxDishes: number,
  price: number,
  description: string,
  image: string,
  rate: number,
  display: boolean
}

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  @Input() dishData!: Dish;
  @Input() maxPriceId: number = 0;
  @Input() minPriceId: number = 0;
  @Output() addDishBasket = new EventEmitter();
  @Output() removeDishBasket = new EventEmitter();
  @Output() delDish = new EventEmitter();
  dishesOrdered: number = 0;
  minusButtonDisplay: boolean = false;
  plusButtonDisplay: boolean = true;

  basketData!:BasketElement;
  
  constructor(private restaurantService: RestaurantService, private router: Router) { }

  ngOnInit(): void {
    this.dishesOrdered = this.restaurantService.getBasketElements(this.dishData.id);
    if(this.dishesOrdered > 0) this.minusButtonDisplay = true;
    if(this.dishesOrdered == this.dishData.maxDishes) this.plusButtonDisplay = false;
    if(this.dishesOrdered == 0 ) this.minusButtonDisplay = false;
    if(this.dishesOrdered < this.dishData.maxDishes) this.plusButtonDisplay = true;

    this.basketData = {
      id: this.dishData.id,
      name: this.dishData.name,
      price: this.dishData.price,
      elements: 1
    }
  }

  incrementDishes() {
    if(this.dishesOrdered < this.dishData.maxDishes) {
      this.dishesOrdered ++;
      this.restaurantService.addToBasket(this.basketData);
      if(this.dishesOrdered > 0) this.minusButtonDisplay = true;
      if(this.dishesOrdered == this.dishData.maxDishes) this.plusButtonDisplay = false;
    }
  }

  decrementDishes() {
    if(this.dishesOrdered > 0) {
      this.dishesOrdered --;
      this.restaurantService.deleteFromBasket(this.basketData);
      if(this.dishesOrdered == 0 ) {
        this.minusButtonDisplay = false;
      }
      if(this.dishesOrdered < this.dishData.maxDishes) this.plusButtonDisplay = true;
    }
  }

  setRate(e:number) {
    this.dishData.rate = e;
  }

  deleteDish(e: number) {
    this.restaurantService.deleteDish(this.dishData.key);
    while(this.dishesOrdered>0){
      this.decrementDishes()
    }
  }

  showDetails(){
    this.router.navigate(['dish-details-component', {dish: JSON.stringify(this.dishData)}]);
  }

}
