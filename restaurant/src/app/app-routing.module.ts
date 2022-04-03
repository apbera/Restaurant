import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { DishesComponent } from './dishes/dishes.component';
import { AddingDishComponent } from './adding-dish/adding-dish.component';
import { BasketComponent } from './basket/basket.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';


const routes: Routes = [
  { path: 'start-component', component: StartComponent },
  { path: 'dishes-component', component: DishesComponent },
  { path: 'adding-dish-component', component: AddingDishComponent },
  { path: 'basket-component', component: BasketComponent },
  { path: 'dish-details-component', component: DishDetailsComponent },
  { path: '**', component: StartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
