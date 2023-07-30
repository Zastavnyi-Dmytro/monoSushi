import { Component } from '@angular/core';
import { DiscountService } from 'src/app/shared/services/discounts/discount.service';
import { Discounts } from 'src/app/shared/interfaces/interfaces.component';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent {
  constructor(
    private discountsBase:DiscountService
  ) { }

  ngOnInit(): void {
    this.getDiscounts()
  }

  public userDiscounts:Array<Discounts> = []

  getDiscounts():void{
    this.discountsBase.getDiscounts().subscribe(data=> {
      this.userDiscounts = data
    })
  }
}
