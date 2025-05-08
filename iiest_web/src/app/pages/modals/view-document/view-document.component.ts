import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { IconDefinition, faDownload, faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { config } from 'src/app/utils/config';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {

  //icons
  faDownload: IconDefinition = faDownload;
  faArrowAltCircleLeft: IconDefinition = faArrowAltCircleLeft;
  faArrowAltCircleRight: IconDefinition = faArrowAltCircleRight;

  //doc var will contain doc detail what type pf doc it is
  doc: any;
  pdfSrc: any;

  DOC_URL = config.DOC_URL;

  activeSlide: number = 0;

  constructor(public activeModal: NgbActiveModal,
    private sanitizer: DomSanitizer,
    private _utilService: UtilitiesService) {

  }
  ngOnInit(): void {
    console.log("doc=================>",this.doc)
    if (this.doc === 'pdf') {
      if(this.doc.multipleDoc){
        this.pdfSrc = this.doc.src.map((src:any) => this.sanitizer.bypassSecurityTrustResourceUrl(src));
      } else {
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`DOC_URL/${this.doc.src}`);
      }
    }
  }

  next() { //methord fpr changing to next pic in case of multidoc true
    const len: number = this.doc.src.length;

    this.activeSlide++;
    if (this.activeSlide >= len) {
      this.activeSlide = 0;
    }
  }

  prev() {  //methord for chnaging to previous pic in case of mutidoc true
    const len: number = this.doc.src.length;

    this.activeSlide--;
    if (this.activeSlide < 0) {
      this.activeSlide = (len - 1);
    }
  }

  downloadDoc(documentId: any, contentType: any) { //methord for downloading doc
    this._utilService.downloadDoc(documentId, contentType);
  }
  calculateRemaningDays(issuedDate: string, licenseDuration: string): string {
    if (!issuedDate || !licenseDuration) return "Invalid Data";
    console.log("issuedDate===========>",issuedDate);
    console.log("licenseDuration===========>",licenseDuration)

  
    let today = new Date().getTime();
    let startDate = new Date(issuedDate);
    let lastDate = new Date(startDate.getFullYear() + Number(licenseDuration), startDate.getMonth(), startDate.getDate()).getTime();
    let remainingDays: number = Math.floor((lastDate - today) / (1000 * 60 * 60 * 24));
  
    let remainingYear: number = Math.floor(remainingDays / 365);
    remainingDays = remainingDays % 365;
  
    for (let year: number = 0; year < remainingYear; year++) {
      if (new Date(remainingYear + year, 1, 29).getDate() === 29) {
        remainingDays--;
      }
    }
  
    let remainingMonths: number = Math.floor(remainingDays / 30.5);
    remainingDays = Math.floor(remainingDays % 30.5); // Fix modulo value to 30.5
     return `${remainingYear} Years ${remainingMonths} Months ${remainingDays} Days`;
  }

  calculateRenewalDate(issuedDate: string, licenseDuration: string): string {
    if (!issuedDate || !licenseDuration) return "Invalid Data";
  
    console.log("issuedDate===========>", issuedDate);
    console.log("licenseDuration===========>", licenseDuration);
  
    let startDate = new Date(issuedDate);
    let expiryDate = new Date(startDate.getFullYear() + Number(licenseDuration), startDate.getMonth(), startDate.getDate());
  
    // Calculate renewal date (3 months before expiry)
    let renewalDate = new Date(expiryDate);
    renewalDate.setMonth(renewalDate.getMonth() - 3);
  
    // Format the date in YYYY-MM-DD format
    let formattedRenewalDate = renewalDate.toISOString().split('T')[0];
    return formattedRenewalDate;
  }
  
}
