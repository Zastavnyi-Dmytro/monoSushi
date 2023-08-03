import { Component } from '@angular/core';
import { ProductService } from 'src/app/shared/services/products/product.service';
import { Products } from 'src/app/shared/interfaces/interfaces.component';

@Component({
  selector: 'app-rolls',
  templateUrl: './rolls.component.html',
  styleUrls: ['./rolls.component.scss']
})
export class RollsComponent {
  constructor(
    private productBase:ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  public userProducts:Array<Products> = []

  getProducts():void{
    this.productBase.getProducts().subscribe(data=> {
      this.userProducts = data
    })
  }
}
