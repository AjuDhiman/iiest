import { Component, Input, OnInit } from '@angular/core';
import { GetdataService } from 'src/app/services/getdata.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-send-mail-bo',
  templateUrl: './send-mail-bo.component.html',
  styleUrls: ['./send-mail-bo.component.scss']
})
export class SendMailBoComponent implements OnInit {
  @Input() boId: any;  
  cities: any[] = [];
  businessTypes: any[] = [];

  selectedCityId: string = 'Select City';
  selectedCategoryId: string = 'Select Category';

  constructor(private _getDataService: GetdataService,public activeModal: NgbActiveModal ) {}

  ngOnInit(): void {
    this.fetchAllCities();
    this.fetchBusinessTypes();
  }

  closeModal(): void {
    this.activeModal.close(); // 👈 close the modal
  }
  fetchAllCities(): void {
    this._getDataService.getAllCities().subscribe(response => {
      if (response.success) {
        this.cities = response.cities;
      }
    });
  }

  fetchBusinessTypes(): void {
    this._getDataService.getAllBusinessTypes().subscribe(response => {
      if (response.success) {
        this.businessTypes = response.businessTypes;
      }
    });
  }
  
  sendMail(): void {
    console.log("fbo==>",this.boId);
    if (!this.boId) {
      console.error('Missing Business Owner ID');
      return;
    }
  
    if (!this.selectedCityId || !this.selectedCategoryId) {
      console.warn('Please select both city and category');
      return;
    }
  
    this._getDataService .updateBusinessOwner(this.boId, this.selectedCityId, this.selectedCategoryId)
      .subscribe({
        next: (res) => {
          console.log('Update Success:', res);
          this.activeModal.close();
        },
        error: (err) => {
          console.error('Update Failed:', err);
        }
      });
  }
  
}

