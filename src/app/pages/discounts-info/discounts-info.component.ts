import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Discounts } from 'src/app/shared/interfaces/interfaces.component';
import { DiscountService } from 'src/app/shared/services/discounts/discount.service';

@Component({
  selector: 'app-discounts-info',
  templateUrl: './discounts-info.component.html',
  styleUrls: ['./discounts-info.component.scss']
})
export class DiscountsInfoComponent {
  public currentDiscount!:Discounts

  constructor(
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response=>{
      this.currentDiscount = response['discountInfo']
    })
  }
}
