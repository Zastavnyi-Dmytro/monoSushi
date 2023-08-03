import { Component } from '@angular/core';

export interface Discounts {
  date:Date,
  id:number,
  name:string,
  title:string,
  description:string,
  img:string
}

export interface DiscountsRequest {
  name:string,
  title:string,
  description:string,
  img:string
}

export interface Category {
  id:number,
  name:string,
  path:string,
  img:string
}

export interface CategoryRequest{
  name:string,
  path:string,
  img:string
}

export interface Products {
  id:number,
  path:string,
  name:string,
  ingredients:string,
  weight:number,
  price:number,
  img:string
}

export interface ProductsRequest {
  path:string,
  name:string,
  ingredients:string,
  weight:number,
  price:number,
  img:string
}

@Component({
  selector: 'app-interfaces',
  templateUrl: './interfaces.component.html',
  styleUrls: ['./interfaces.component.scss']
})
export class InterfacesComponent {

}
