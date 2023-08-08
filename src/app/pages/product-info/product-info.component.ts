import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/shared/interfaces/interfaces.component';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/products/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
  public currentProduct!:Products

  constructor(
    private productService:ProductService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ){}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response=>{
      this.currentProduct = response['productInfo']
    })
  }

  productCount(product:Products, value:boolean):void{
    if(value){
      ++this.currentProduct.count
    }
    else if(!value&&product.count>1){
      --this.currentProduct.count
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
