import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent {
  inputValue: string = '';

  onInputChange() {
    console.log('inputValue has changed:', this.inputValue);
  }
}
