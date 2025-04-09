import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { GetdataService } from 'src/app/services/getdata.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-consumer-main-page',
  templateUrl: './consumer-main-page.component.html',
  styleUrls: ['./consumer-main-page.component.scss']
})
export class ConsumerMainPageComponent {
  shops: any[] = [];
  faStore = faStore;
  showDropdown = false;

  shopId: string = '';
  consumer = JSON.parse(localStorage.getItem('consumer') || '{}');

  constructor(private router: Router,private route: ActivatedRoute ,private getDataService: GetdataService,  private registerService: RegisterService) {}

  statistics: any ;

  ngOnInit(): void {
    this.registerService.setShopId("");

    console.log("consumer==>",this.consumer)
    this.shopId = this.route.snapshot.paramMap.get('shopId') || '';
    console.log('Shop ID:', this.shopId);

    this.fetchStatistics(this.consumer.iiest_member_id);

    this.getDataService.getShopsByBoId(this.consumer.iiest_member_id).subscribe({
      next: (res: any) => {
        this.shops = res.shops || [];
      },
      error: (err) => {
        console.error('Failed to load shops:', err);
      }
    });
  }
  navigateToDashboard(shop: any) {
    this.registerService.setShopId(shop.shopId);
    this.router.navigate(['/consumer-dashboard']);
  }
  

  fetchStatistics(boId:any): void {
    this.getDataService.getConsumerStatisticsData(boId).subscribe(
      (response) => {
        if (response.success) {
          this.statistics = response.statistics;
        }
      },
      (error) => {
        console.error('Error fetching statistics:', error);
      }
    );
  }
}
