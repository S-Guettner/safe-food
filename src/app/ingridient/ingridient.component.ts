import { Component, Input } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-ingridient',
  templateUrl: './ingridient.component.html',
  styleUrls: ['./ingridient.component.css']
})
export class IngridientComponent {
  constructor(private sharedService: SharedService) {}

  ingredientList: string[] = [];
  allreadyAdded: boolean = false

  
  @Input() ingridientName:string = ""
  @Input() ingridientImageUrl:string = ""
  
  
  addToList(name:string): void {
    const indexToRemove : number = this.sharedService.ingredientList.indexOf(this.ingridientName)

    if(!this.sharedService.ingredientList.includes(name)){
      this.sharedService.ingredientList.push(name);
      this.allreadyAdded = !this.allreadyAdded 
    }else{
      this.allreadyAdded = !this.allreadyAdded 
      this.sharedService.ingredientList.splice(indexToRemove, 1)
    }
    console.log(this.sharedService.ingredientList)


}
}
