import { Component, OnInit } from '@angular/core';
import { BasketElement } from '../basket/basket.component';
import { Dish } from '../dish/dish.component';

import {dishes} from '../dishes'
import { RestaurantService } from '../restaurant.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {

  dishesData: Dish[] = [];
  maxPriceId: number;
  minPriceId: number;
  reservedDishes: number = 0;
  basket: BasketElement[] = [];
  basketSum: number = 0;
  p: number = 1;
  pageSize: number = 9;

  constructor(public restaurantService: RestaurantService) {
    this.minPriceId = 0;
    this.maxPriceId = 0;
    //this.setMinMax();
    this.getDishesList();
  }

  getDishesList() {
    this.restaurantService.getDishesList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(dishes =>{
      this.dishesData = dishes as Dish[];
    });

  }

  getReservedDishes(){
    return this.restaurantService.reservedDishes();
  }

  ngOnInit(): void {
  }

  setMinMax() {
    let maxPrice = this.dishesData[0].price;
    let minPrice = this.dishesData[0].price;
    this.maxPriceId = this.dishesData[0].id;
    this.minPriceId = this.dishesData[0].id;

    for(let d of this.dishesData) {
        if(d.price < minPrice) {
          minPrice = d.price;
          this.minPriceId = d.id;
        }
        if(d.price > maxPrice) {
          maxPrice = d.price;
          this.maxPriceId = d.id;
        }
    }
  }

  setMinMaxFilter(tab: number[]) {
    if(tab.length == 0) return;
    let maxPrice = this.dishesData[tab[0]].price;
    let minPrice = this.dishesData[tab[0]].price;
    this.maxPriceId = this.dishesData[tab[0]].id;
    this.minPriceId = this.dishesData[tab[0]].id;
    for(let d of this.dishesData) 
      if(tab.includes(d.id)){
        if(d.price < minPrice) {
          minPrice = d.price;
          this.minPriceId = d.id;
        }
        if(d.price > maxPrice) {
          maxPrice = d.price;
          this.maxPriceId = d.id;
        }
      }
  }

  addToBasket(e: Dish){
    this.reservedDishes += 1;
    this.basketSum += e.price;
    let is = false;
    for(let c of this.basket) {
      if(c.id == e.id) {
        c.elements += 1;
        is = true;
      }
    }
    if(!is) {
      this.basket.push({
        id: e.id,
        name: e.name,
        price: e.price,
        elements: 1
      });
    }
  }

  removeFromBasket(e: Dish){
    this.reservedDishes -= 1;
    this.basketSum -= e.price;
    for(let c = 0; c < this.basket.length; c++) {
      if(this.basket[c].id == e.id) {
        this.basket[c].elements -= 1;
        if(this.basket[c].elements == 0) {
          this.basket.splice(c, 1);
        }
      }
    }
  }

  deleteDish() {
    this.setMinMax();
  }

  addDish(e: Dish) {
    e.id = this.dishesData[this.dishesData.length - 1].id + 1;
    this.dishesData.push(e);
    this.setMinMax()
  }


  ngAfterViewInit(): void {
  }

}
