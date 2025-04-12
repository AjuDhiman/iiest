import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 
import { GetdataService } from 'src/app/services/getdata.service';
import { RegisterService } from 'src/app/services/register.service';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expert-resources',
  templateUrl: './expert-resources.component.html',
  styleUrls: ['./expert-resources.component.scss']
})
export class ExpertResourcesComponent implements OnInit {
  faPlus = faPlus;
  faArrowLeft = faArrowLeft;


  showForm: boolean = true; // ✅ By default form is open

  shopId: string | null = null;
  resourceList: any[] = []; // ✅ List to store resources

  constructor(
    private router: Router,
    private getdataService: GetdataService,
    private toastr: ToastrService,
    private registerService: RegisterService
  ) { }

  ngOnInit(): void {
    this.shopId = this.registerService.getShopId();
    if (this.shopId) {
      this.fetchResourceRequirements();
    }
  }
  
  fetchResourceRequirements() {
    this.getdataService.getResourceRequirements(this.shopId!).subscribe({
      next: (response) => {
        this.resourceList = response.data;
        console.log('Fetched resources:', this.resourceList);
  
        // ✅ If there is at least one resource, hide the form
        if (this.resourceList.length > 0) {
          this.showForm = false;
        }
      },
      error: (error) => {
        console.error('Error fetching resources:', error);
        this.toastr.error(error || 'Failed to fetch resource requirements');
      }
    });
  }
  
  onSubmit(form: any) {
    if (form.valid) {
      const { designation, count, salary, jobDescription } = form.value;
  
      if (!this.shopId) {
        this.toastr.error('Shop ID is missing!');
        return;
      }
  
      this.getdataService.addResourceRequirement(this.shopId, jobDescription, designation, count, salary).subscribe({
        next: (response) => {
          console.log('API Success:', response);
          this.toastr.success(response.message || 'Resource requirement submitted successfully!');
          form.resetForm();
          this.showForm = false; // ✅ Hide form after submit
          this.fetchResourceRequirements(); // Refresh list
        },
        error: (error) => {
          console.error('API Error:', error);
          this.toastr.error(error || 'Failed to submit resource requirement');
        }
      });
    } else {
      this.toastr.warning('Please fill all required fields.');
    }
  }
  
  openForm() {
    this.showForm = true;
  }
  goBack() {
    this.router.navigate(['/consumer-dashboard']);
  }
  closeForm() {
    this.showForm = false;
  }
  
}
