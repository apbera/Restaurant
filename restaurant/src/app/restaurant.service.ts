import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { BasketElement } from './basket/basket.component';


import {Dish} from './dish/dish.component';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private dishesPath = 'dishes';

  dishesRef: AngularFireList<Dish>;
  dishes: Dish[] = [];
  basket: BasketElement[] = [];

  constructor(private db: AngularFireDatabase) { 
    this.dishesRef = db.list(this.dishesPath);
    this.updateLocalDishList();
  }

  getDishesList()  {
    return this.dishesRef;
  }

  getFreeID(): number {
    return this.dishes[this.dishes.length - 1].id + 1;
  }

  addDish(dish: Dish): void {
    this.dishesRef.push({...dish})
  }

  updateLocalDishList(){
    this.dishesRef.snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(dish =>{
      this.dishes = dish as Dish[];
    });
  }

  deleteDish(key: string) {
    this.dishesRef.remove(key);
  }

  updateRate(key: string, value: any) {
    this.dishesRef.update(key, value);
  } 

  reservedDishes() {
    let sum = 0;
    for(let b of this.basket) {
      sum += b.elements;
    }
    return sum;
  }

  getBasket(): BasketElement[]{
    return this.basket;
  }

  addToBasket(dish: BasketElement): void {
    
    for(let i = 0; i<this.basket.length; i++){
      if(this.basket[i].id == dish.id) {
        this.basket[i].elements++;
        return;
      }
    }

    this.basket.push(dish);
  }

  deleteFromBasket(dish: BasketElement): void {

    for(let b = 0; b < this.basket.length; b++) {
      if(this.basket[b].id == dish.id) {
        this.basket[b].elements -= 1;
        if(this.basket[b].elements == 0) {
          this.basket.splice(b, 1);
        }
      }
    }
    
  }

  getBasketElements(id: number) {
    for(let b of this.basket) {
      if(b.id === id) {
        return b.elements;
      }
    }
    return 0;
  }
}
