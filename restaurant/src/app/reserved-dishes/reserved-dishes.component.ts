import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reserved-dishes',
  templateUrl: './reserved-dishes.component.html',
  styleUrls: ['./reserved-dishes.component.css']
})
export class ReservedDishesComponent implements OnInit {

  @Input() reservedDishes: number;
  
  constructor() { 
    this.reservedDishes = 0;
  }

  ngOnInit(): void {
  }

}
