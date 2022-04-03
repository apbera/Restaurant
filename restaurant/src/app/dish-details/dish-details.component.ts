import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketElement } from '../basket/basket.component';
import { Dish } from '../dish/dish.component';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {

  dishData!: Dish;
  basketData!: BasketElement;
  dishesOrdered: number = 0;
  minusButtonDisplay: boolean = false;
  plusButtonDisplay: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.route.params.subscribe(parameter => {
      //console.log(parameter);
      this.dishData = JSON.parse(parameter['dish']) as Dish;
    })

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
    this.restaurantService
      .updateRate(this.dishData.key, { rate: e })
  }

  returnToMenu() {
    this.router.navigate(['dishes-component']);
  }


}
