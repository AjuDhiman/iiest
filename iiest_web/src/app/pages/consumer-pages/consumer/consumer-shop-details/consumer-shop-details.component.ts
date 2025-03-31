import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetdataService } from 'src/app/services/getdata.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-consumer-shop-details',
  templateUrl: './consumer-shop-details.component.html',
  styleUrls: ['./consumer-shop-details.component.scss']
})
export class ConsumerShopDetailsComponent implements OnInit {
  shops: any[] = [];
  boId: string = 'IIEST/MB/982031';

  constructor(private router: Router,private getDataService: GetdataService,  private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.getDataService.getShopsByBoId(this.boId).subscribe({
      next: (res: any) => {
        this.shops = res.shops || [];
      },
      error: (err) => {
        console.error('Failed to load shops:', err);
      }
    });
  }

  navigateToOther(shop: any) {
    this.registerService.setShopId(shop.shopId);

    this.router.navigate(['/consumer-main-page', shop.shopId]);
  }
  
}
