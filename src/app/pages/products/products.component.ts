import { Component } from '@angular/core';
import { Products } from 'src/app/shared/interfaces/interfaces.component';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/products/product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent{
  public userProducts:Array<Products> = []
  public activeRolls = false
  public currentProduct!:Products
  private eventSubscription!:Subscription

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){  
    this.eventSubscription = this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.loadProducts()
      }
    })
  }

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts():void{
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getProductsByCategory(categoryName).then(data=>{
      this.userProducts = data.products
      if (data.products.length > 0 && data.products[0].path === 'rolls') {
        this.activeRolls = true;
      } else {
        this.activeRolls = false;
      }
    })
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

  productCount(product:Products, value:boolean):void{
    if(value){
      ++product.count
    }
    else if(!value&&product.count>1){
      --product.count
    }
  }
}
