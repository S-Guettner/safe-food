import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {

  }
  // runs instant
  ngOnInit(): void {
    const apiKey = environment.apiKey
    console.log(environment.apiKey)
    this.http.get(`https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian,dessert&apiKey=${apiKey}`).subscribe(res => 
    console.log(res)
    )
  }

  title = 'safe-food';
}
