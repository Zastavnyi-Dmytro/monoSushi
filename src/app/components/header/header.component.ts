import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/shared/interfaces/interfaces.component';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationComponent } from 'src/app/pages/authorization/authorization.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  burgerSwitch = false
  public total = 0
  basketSwitch = false
  isLogin = false
  loginUrl = ''
  loginPage = ''

  currentProduct!:Products
  public basket: Array<Products> = [];

  constructor(
    private orderServive: OrderService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private accountService: AccountService,
    private router: Router,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.checkLogin();
    this.checkUpdateUserLogin()
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

  checkLogin(){
    let user = JSON.parse(localStorage.getItem('currentUser') as string)
    if(user && user.role === "ADMIN"){
      this.isLogin = true
      this.loginUrl = 'admin/discounts'
      this.loginPage = 'Admin'
    }
    else if(user && user.role === "USER"){
      this.isLogin = true
      this.loginUrl = 'user-profile'
      this.loginPage = 'User'
    }
    else{
      this.isLogin = false
      this.loginUrl = 'home'
      this.loginPage = ''
    }
  }

  checkUpdateUserLogin(){
    this.accountService.isUserLogin$.subscribe(()=>{
      this.checkLogin()
    })
  }

  logout(){
    this.router.navigate(['home'])
    localStorage.removeItem('currentUser')
    this.accountService.isUserLogin$.next(true)
  }

  openLoginDialog(){
    this.dialog.open(AuthorizationComponent, {
      panelClass: 'auth-dialog',
      autoFocus: false
    })
  }
}
