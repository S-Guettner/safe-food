import { Component } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../types/ingredient.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
})


export class IngredientsComponent {
  constructor(private http: HttpClient, private sharedService: SharedService) {}
  inputValue: string = '';
  ingredients: Ingredient[] = [];

  ingredientsList: string[] = this.sharedService.ingredientList;

  onInputChange() {
    console.log('inputValue has changed:', this.inputValue);
    const apiKey = environment.apiKey;
    this.http
    .get<Ingredient[]>(
        `https://api.spoonacular.com/food/ingredients/autocomplete?query=${this.inputValue}&number=5&apiKey=${apiKey}`
      )
      .subscribe((res) => (this.ingredients = res));
      this.logIngredients();
  }
  private logIngredients() {
    console.log(this.ingredients);
  }
}
