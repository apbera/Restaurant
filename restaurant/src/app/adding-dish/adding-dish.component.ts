import { invalid } from "@angular/compiler/src/render3/view/util";
import { NgModule, Component, OnInit, EventEmitter, Output } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import { Dish } from '../dish/dish.component';
import { RestaurantService } from '../restaurant.service';

interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null
}

@Component({
  selector: 'app-adding-dish',
  templateUrl: './adding-dish.component.html',
  styleUrls: ['./adding-dish.component.css']
})
export class AddingDishComponent implements OnInit {

  constructor(private restaurantService: RestaurantService) { this.createForm(); }

  ngOnInit(): void {
    this.createForm();
  }

  @Output() addDish = new EventEmitter();

  newDish: Dish = {
      id: 1,
      name: '',
      cuisine: '',
      type: '',
      category: "",
      ingridients: "",
      maxDishes: 0,
      price: 0,
      description: "",
      image: "assets/img/dish.jpg",
      rate: 1,
      display: true
  };

  addingDishForm: FormGroup = Object();
  name: FormControl = new FormControl("",  Validators.required);
  cuisine: FormControl = new FormControl("",  Validators.required);
  type: FormControl = new FormControl("",  Validators.required);
  category: FormControl = new FormControl("",  Validators.required);
  ingridients: FormControl = new FormControl("",  Validators.required);
  maxDishes: FormControl = new FormControl("",  [Validators.required, Validators.min(0)]);
  price: FormControl = new FormControl("",  [Validators.required, Validators.min(0)]);
  description: FormControl = new FormControl("",  Validators.required);
  image: FormControl = new FormControl("",  Validators.required);


  createForm() {
    this.addingDishForm = new FormGroup({
      name: this.name,
      cuisine: this.cuisine,
      type: this.type,
      category: this.category,
      ingridients: this.ingridients,
      maxDishes: this.maxDishes,
      price: this.price,
      description: this.description,
      image: this.image,
    });
  }

  onSubmit() {
    if (this.addingDishForm.valid) {

      this.restaurantService.addDish( {
        id: this.restaurantService.getFreeID(),
        name: this.addingDishForm.value.name,
        cuisine: this.addingDishForm.value.cuisine,
        type: this.addingDishForm.value.type,
        category: this.addingDishForm.value.category,
        ingridients: this.addingDishForm.value.ingridients,
        maxDishes: this.addingDishForm.value.maxDishes,
        price: this.addingDishForm.value.price,
        description: this.addingDishForm.value.description,
        image: this.newDish.image,
        rate: 1,
        display: true
    });
      this.addingDishForm.reset();
    }
  }

}

