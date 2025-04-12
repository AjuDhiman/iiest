import { Component } from '@angular/core';

@Component({
  selector: 'app-local-officer',
  templateUrl: './local-officer.component.html',
  styleUrls: ['./local-officer.component.scss']
})
export class LocalOfficerComponent {
  designatedOfficer = 'SAURABH SHARMA';
  foodSafetyOfficers = ['ANJALI SIDDHARTH', 'Naresh Kumar Sharma', 'Sunny Rao'];
}
