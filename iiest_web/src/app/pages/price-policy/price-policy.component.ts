import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  IconDefinition,
  faBuilding,
  faCircleInfo,
  faHome,
  faLocationDot,
  faPeopleGroup,
  faPhone,
  faSignIn
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/services/register.service';
import { LoginComponent } from '../login/login.component';
import { OnboardModalComponent } from '../onboard-modal/onboard-modal.component';

@Component({
  selector: 'app-price-policy',
  templateUrl: './price-policy.component.html',
  styleUrls: ['./price-policy.component.scss']
})
export class PricePolicyComponent implements OnInit, AfterViewInit {
  faPeopleGroup: IconDefinition = faPeopleGroup;
  faBuilding: IconDefinition = faBuilding;
  faLocationDot: IconDefinition = faLocationDot;
  faHome: IconDefinition = faHome;
  faSignIn: IconDefinition = faSignIn;
  faCircleInfo: IconDefinition = faCircleInfo;
  faPhone: IconDefinition = faPhone;
  isToken: boolean = false;
  isMobileNav: boolean = false;

  @ViewChild('backgroundVidRef') backgroundVidRef!: ElementRef;

  constructor(
    private modalService: NgbModal,
    private _registerService: RegisterService,
    private _toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const bodyElement = document.body;
    bodyElement.classList.remove('app');
    this.isToken = this._registerService.isLoggedIn();
  }

  openModal() {
    if (!this.isToken) {
      this.modalService.open(LoginComponent, { size: 'md', backdrop: 'static' });
    } else {
      const bodyElement = document.body;
      bodyElement.classList.add('app');
      this.router.navigateByUrl('/home');
    }
  }

  openOnboardModal() {
    this.modalService.open(OnboardModalComponent, { size: 'md', backdrop: 'static' });
  }

  routeTo(str: string) {
    this.router.navigateByUrl(`/${str}`);
  }
}
