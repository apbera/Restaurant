import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Dish } from '../dish/dish.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  cuisines: string[] = [];
  categories: string[] = [];
  ratings: number[] = [];
  filteredCuisines: string[] = [];
  filteredCategories: string[] = [];
  filteredRatings: number[] = [];
  minPrice:number = 1000;
  maxPrice:number = 0;
  filteredMinPrice: number = 0;
  filteredMaxPrice: number = 0;

  @Input() dishes : Dish[] = [];
  @Output() setMinMaxFilter = new EventEmitter();
  
  constructor() {
    
  }

  ngOnInit(): void {
    this.countRanges();

  }

  countRanges() {
    for(let d of this.dishes) if(d.display){
      if(!this.cuisines.includes(d.cuisine)) 
        this.cuisines.push(d.cuisine);
      if(!this.categories.includes(d.category)) 
        this.categories.push(d.category);
      if(!this.ratings.includes(d.rate)) 
        this.ratings.push(d.rate);
      if(d.price > this.maxPrice) {
        this.maxPrice = d.price;
      }
      if(d.price < this.minPrice) {
        this.minPrice = d.price;
      }
    }
    this.filteredMinPrice = this.minPrice;
    this.filteredMaxPrice = this.maxPrice;
  }

  cuisineFilter(e: any){
    let cuis = e.target.name;
    if(e.target.checked){
      this.filteredCuisines.push(cuis);
    } else {
      for(let i = 0; i < this.filteredCuisines.length; i++) {
        if(this.filteredCuisines[i] == cuis) {
          this.filteredCuisines.splice(i, 1);
        }
      }
    }
    this.apllyFilters();
  }

  categoryFilter(e: any){
    let cat = e.target.name;
    if(e.target.checked){
      this.filteredCategories.push(cat);  
    } else {
      for(let i = 0; i < this.filteredCategories.length; i++) {
        if(this.filteredCategories[i] == cat) {
          this.filteredCategories.splice(i, 1);
        }
      }
    }
    this.apllyFilters();
  }

  apllyFilters() {
    let tab: number[] =[];
    for(let t of this.dishes) {
      if((this.filteredCuisines.length == 0 || this.filteredCuisines.includes(t.cuisine)) &&
        (this.filteredCategories.length == 0 || this.filteredCategories.includes(t.category)) &&
        t.price >= this.filteredMinPrice &&
        t.price <= this.filteredMaxPrice &&
        (this.filteredRatings.length == 0  || this.filteredRatings.includes(t.rate))
      ){
        t.display = true;
        tab.push(t.id);
      } else {
        t.display = false;
      }
    }

    this.setMinMaxFilter.emit(tab);
  }

  changeMinPrice(e: any) {
      this.filteredMinPrice = parseInt(e.target.value);
      this.apllyFilters();
  }

  changeMaxPrice(e: any) {
    this.filteredMaxPrice = parseInt(e.target.value);
    this.apllyFilters();
}

selectRating(ev: any, e: number) {
    if(ev.target.checked){
      this.filteredRatings.push(e);
    } else {
      for(let i = 0; i < this.filteredRatings.length; i++) {
        if(this.filteredRatings[i] == e) {
          this.filteredRatings.splice(i, 1);
        }
      }
    }
  this.apllyFilters();
  }

}
