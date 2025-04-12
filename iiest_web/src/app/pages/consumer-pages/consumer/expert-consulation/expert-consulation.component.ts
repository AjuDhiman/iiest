import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetdataService } from 'src/app/services/getdata.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-expert-consulation',
  templateUrl: './expert-consulation.component.html',
  styleUrls: ['./expert-consulation.component.scss']
})
export class ExpertConsulationComponent {
  shopId: string | null = null;

  constructor(
    private getdataService: GetdataService,
    private toastr: ToastrService,
        private registerService: RegisterService 
    
  ) {}
  ngOnInit(): void {
    this.shopId = this.registerService.getShopId(); 
  }
  onSubmitConsultation(form: any) {
    if (form.valid) {
      const { consultationDetails } = form.value;

      if (!this.shopId) {
        this.toastr.error('Shop ID is missing!');
        return;
      }

      this.getdataService.addExpertConsultation(consultationDetails,this.shopId).subscribe({
        next: (response) => {
          console.log('API Success:', response);
          this.toastr.success(response.message || 'Consultation submitted successfully!');
          form.resetForm();
        },
        error: (error) => {
          console.error('API Error:', error);
          this.toastr.error(error || 'Failed to submit consultation');
        }
      });
    } else {
      this.toastr.warning('Please provide your consultation details.');
    }
  }
}
