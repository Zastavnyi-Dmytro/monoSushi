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
  public discountId: string=''
  public currentDiscount!:Discounts

  constructor(
    private discountsBase:DiscountService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.discountId = this.route.snapshot.paramMap.get('id')!;
    this.getDiscount()
  }


  getDiscount():void{
    this.discountsBase.getOneDiscount(this.discountId).subscribe(data=> {
      this.currentDiscount = data as Discounts
    })
  }
}
