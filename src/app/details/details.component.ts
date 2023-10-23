import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';

interface Recipe {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: ExtendedIngredient[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  winePairing: WinePairing;
  instructions: string | null;
  analyzedInstructions: any[]; // You can define a more specific structure here
  originalId: number | null;
  spoonacularSourceUrl: string;
}

interface ExtendedIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
    metric: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
  };
}

interface WinePairing {
  pairedWines: string[];
  pairingText: string;
  productMatches: WineProductMatch[];
}

interface WineProductMatch {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  averageRating: number;
  ratingCount: number;
  score: number;
  link: string;
}


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient , private router: Router){}

  recipeId: number = 0

  apiKey = environment.apiKey;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const recipeIdString = params.get('id');
      /* check if recipeIdString is not NULL */
      if (recipeIdString !== null) {
        this.recipeId = parseInt(recipeIdString);
      }
    });
    if(this.recipeId != 0){

    }
    this.http
  .get<Recipe>(
    `https://api.spoonacular.com/recipes/${this.recipeId}/information?includeNutrition=false&apiKey=${this.apiKey}`
  )
  .subscribe((res: Recipe) => {
    console.log(res.sourceUrl);
    window.location.href = res.sourceUrl;
  });
  }
}
