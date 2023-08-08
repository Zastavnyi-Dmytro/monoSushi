import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/shared/interfaces/interfaces.component';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  burgerSwitch = false
  public total = 0
  basketSwitch = false

  currentProduct!:Products
  public basket: Array<Products> = [];

  constructor(
    private orderServive: OrderService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ){}

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  openBurger(): void {
    this.burgerSwitch = !this.burgerSwitch
  }
  closeBurger(): void {
    this.burgerSwitch = false
  }

  openBasket():void{
    this.basketSwitch = !this.basketSwitch
  }

  loadBasket(): void {
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: Products) => total + prod.count * prod.price, 0);
  }

  updateBasket(){
    this.orderServive.changeBasket.subscribe(()=>{
      this.loadBasket()
    })
  }

  productCount(product:Products, value:boolean):void{
    if(value){
      ++product.count
    }
    else if(!value&&product.count>1){
      --product.count
    }
    this.total = this.basket
      .reduce((total: number, prod: Products) => total + prod.count * prod.price, 0);
  }

  deleteItem(item:Products){
    let basket = JSON.parse(localStorage.getItem('basket') as string)
    for(let i=0;i<basket.length;i++){
      if(basket[i].id == item.id){
        basket.splice(i,1)
      }
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.loadBasket()
  }
}
