import { Component } from '@angular/core';
import { ProductService } from 'src/app/shared/services/products/product.service';
import { Products } from 'src/app/shared/interfaces/interfaces.component';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private productBase:ProductService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.activatedRoute.data.subscribe(response=>{
      this.currentProduct = response['productInfo'];
    })
  }

  public userProducts:Array<Products> = []
  public currentProduct!:Products

  getProducts():void{
    this.productBase.getProducts().subscribe(data=> {
      this.userProducts = data
    })
  }

  productCount(product:Products, value:boolean):void{
    if(value){
      ++product.count
    }
    else if(!value&&product.count>1){
      --product.count
    }
  }

  addToBasket(product: Products): void {
    let basket: Array<Products> = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    }
    else {
      basket.push(product);
    }
    let test = localStorage.getItem('basket')
    if (test !== null && JSON.parse(test).length === 0) {
      localStorage.clear()
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }
}
