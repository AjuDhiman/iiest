import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetdataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-consumer-main-page',
  templateUrl: './consumer-main-page.component.html',
  styleUrls: ['./consumer-main-page.component.scss']
})
export class ConsumerMainPageComponent {
  shopId: string = '';
  consumer = JSON.parse(localStorage.getItem('consumer') || '{}');

  constructor(private router: Router,private route: ActivatedRoute ,private getDataService: GetdataService) {}
  navigateToDashboard() {
    this.router.navigate(['/consumer-dashboard']);
  }
  statistics: any ;

  ngOnInit(): void {
    console.log("consumer==>",this.consumer)
    this.shopId = this.route.snapshot.paramMap.get('shopId') || '';
    console.log('Shop ID:', this.shopId);

    this.fetchStatistics(this.consumer.iiest_member_id);
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
