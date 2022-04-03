import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishComponent } from './dish/dish.component';
import { DishesComponent } from './dishes/dishes.component';
import { ReservedDishesComponent } from './reserved-dishes/reserved-dishes.component';
import { AddingDishComponent } from './adding-dish/adding-dish.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { FilterComponent } from './filter/filter.component';
import { BasketComponent } from './basket/basket.component';
import { StartComponent } from './start/start.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';

import { AngularFireModule } from '@angular/fire/compat';
import{ AngularFireDatabaseModule }from'@angular/fire/compat/database';
import { environment } from '../environments/environment'; 

import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    DishComponent,
    DishesComponent,
    ReservedDishesComponent,
    AddingDishComponent,
    RatingComponent,
    FilterComponent,
    BasketComponent,
    StartComponent,
    DishDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgxPaginationModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
