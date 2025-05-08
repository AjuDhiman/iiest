import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetdataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-update-bo-customer',
  templateUrl: './update-bo-customer.component.html',
  styleUrls: ['./update-bo-customer.component.scss']
})
export class UpdateBoCustomerComponent implements OnInit {
  customerId: string | null = null;
  isCreating = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: GetdataService
  ) {}

  ngOnInit(): void {
    const encodedId = this.route.snapshot.paramMap.get('customerId');
    this.customerId = encodedId ? decodeURIComponent(encodedId) : null;
    console.log('Decoded customerId:', this.customerId);
  }

  createCustomer() {
    if (!this.customerId) return;

    this.isCreating = true;

    this.api.createCustomerForBo(this.customerId).subscribe({
      next: (res) => {
        alert('Customer created successfully!');
        this.router.navigate(['/']); 
        console.log(res);
        
      },
      error: (err) => {
        alert('Failed to create customer: ' + err.error?.message || err.message);
        console.error(err);
      },
      complete: () => {
        this.isCreating = false;
      }
    });
  }
}
