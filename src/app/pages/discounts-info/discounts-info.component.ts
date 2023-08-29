import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Discounts } from 'src/app/shared/interfaces/interfaces.component';

@Component({
  selector: 'app-discounts-info',
  templateUrl: './discounts-info.component.html',
  styleUrls: ['./discounts-info.component.scss']
})
export class DiscountsInfoComponent {
  public currentDiscount!:Discounts

  constructor(
    public activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    if (this.activatedRoute.data) {
      this.activatedRoute.data.subscribe(response => {
        this.currentDiscount = response['discountInfo'];
      });
    }
  }
}
