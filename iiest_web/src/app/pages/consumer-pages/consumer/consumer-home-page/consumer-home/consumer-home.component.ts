import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';


@Component({
  selector: 'app-consumer-home',
  standalone: true,
   imports: [CommonModule, HighchartsChartModule],
  templateUrl: './consumer-home.component.html',
  styleUrls: ['./consumer-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConsumerHomeComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  
  // Chart options
  salesChartOptions: Highcharts.Options = {};
  productChartOptions: Highcharts.Options = {};
  
  // Chart update flags
  salesChartUpdateFlag = false;
  productChartUpdateFlag = false;
  
  stats = [
    { title: 'Total Users', value: '2,345' },
    { title: 'New Users', value: '128' },
    { title: 'Active Sessions', value: '1,879' },
    { title: 'Bounce Rate', value: '24%' }
  ];

  recentTransactions = [
    { id: '#TX-1234', user: 'John Smith', date: '2025-03-15', amount: '$120.00', status: 'Completed' },
    { id: '#TX-1235', user: 'Sarah Johnson', date: '2025-03-14', amount: '$75.50', status: 'Pending' },
    { id: '#TX-1236', user: 'Michael Brown', date: '2025-03-14', amount: '$250.00', status: 'Completed' },
    { id: '#TX-1237', user: 'Emily Davis', date: '2025-03-13', amount: '$32.99', status: 'Failed' },
    { id: '#TX-1238', user: 'Robert Wilson', date: '2025-03-13', amount: '$189.99', status: 'Completed' }
  ];

  topProducts = [
    { name: 'Product A', sales: 1245, revenue: '$12,450' },
    { name: 'Product B', sales: 876, revenue: '$8,760' },
    { name: 'Product C', sales: 643, revenue: '$6,430' },
    { name: 'Product D', sales: 421, revenue: '$4,210' }
  ];

  username = 'Admin User';

  ngOnInit() {
    this.initSalesChart();
    this.initProductChart();
  }

  initSalesChart() {
    this.salesChartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Monthly Sales Comparison'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      },
      yAxis: {
        title: {
          text: 'Sales Amount'
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Sales 2025',
          type: 'column',
          data: [65, 59, 80, 81, 56, 55],
          color: '#3498db'
        },
        {
          name: 'Sales 2024',
          type: 'column',
          data: [28, 48, 40, 19, 86, 27],
          color: '#e74c3c'
        }
      ]
    };
  }

  initProductChart() {
    this.productChartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Product Sales Distribution'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Sales',
        type: 'pie',
        // colorByPoint: true,
        data: this.topProducts.map(product => ({
          name: product.name,
          y: product.sales
        }))
      }]
    };
  }
}