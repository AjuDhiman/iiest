import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { IconDefinition, faFile } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/services/register.service';
import { ViewDocumentComponent } from '../view-document/view-document.component';
import { GetdataService } from 'src/app/services/getdata.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sale-doc-modal',
  templateUrl: './sale-doc-modal.component.html',
  styleUrls: ['./sale-doc-modal.component.scss']
})
export class SaleDocModalComponent implements OnInit {
  faPlus = faPlus; // Assign icon variables
  faMinus = faMinus;
  //var keeps track that form is sumbitted or not
  submitted: boolean = false;
  serviceType: string;

  //var contains all the data about fbo to show
  fboData: any;

  //variables contains data related to images or files if exsists snd comming from backend
  managerPhotoObj: any;
  shopPhotoObj: any;
  managerAadharObj: any;
  licenseObj:any;

  //var for saving names of the docs
  aadhar: string[] = [];
  managerPhoto: string = '';
  shopPhoto: string = '';
  licensePhoto:string='';


  //var that will containg generated file name and save it in documents schema
  docObjects: { name: string, format: string, isMultiDoc: boolean, src: string[],issuedDate?: string ,licenseDuration?:string,licenseId?:string }[] = [];
  Licenses: any[] = []; // Store business types
  selectedLicense: any = null; // Store selected license

  //var for storing files
  aadharFile: File;
  shopPhotoFile: File;
  managerPhotoFile: File;
  licensePhotoFile:File;

  // var for deciding loader 
  loading: boolean = false;

  //fa icons
  faFile: IconDefinition = faFile;

  //logic form
  docForm: FormGroup = new FormGroup({
    managerName: new FormControl(''),
    address: new FormControl(''),
    pincode: new FormControl(''),
    shopPhoto: new FormControl(''),
    managerPhoto: new FormControl(''),
    managerAadhar: new FormControl(''),
    // createdDate: new FormControl(''), 
    createdDate: new FormControl('', Validators.required), 
    licenseDuration: new FormControl('', [Validators.required, Validators.min(1)]),  
  
  });

  get docform(): { [key: string]: AbstractControl } {
    return this.docForm.controls;
  }

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private _registerService: RegisterService,
    private _toastrService: ToastrService,
    private _getdataService: GetdataService,
    private _utilServives: UtilitiesService,
    private modalService: NgbModal,  private fb: FormBuilder,  

  ) {

  }

  ngOnInit(): void {
console.log("city_Id----->",this.fboData.fboInfo.boInfo.city_Id);
console.log("business_category_ID----->",this.fboData.fboInfo.boInfo.business_category_ID);

    this.setFormValidation();
    this.fetchAllLicense(this.fboData.fboInfo.boInfo.city_Id,this.fboData.fboInfo.boInfo.business_category_ID );
    this.docForm.patchValue({
      managerName: this.fboData.fboInfo.boInfo.manager_name,
      address: this.fboData.fboInfo.address,
      pincode: this.fboData.fboInfo.pincode,
      createdDate: '', 
      licenseDuration: ''
    });

    this.docForm = this.fb.group({
      managerName: [this.fboData?.fboInfo?.boInfo?.manager_name || '', Validators.required],
      address: [this.fboData?.fboInfo?.address || '', Validators.required],
      pincode: [this.fboData?.fboInfo?.pincode || '', Validators.required],
      shopPhoto: ['', Validators.required],
      managerPhoto: ['', Validators.required],
      licenses: this.fb.array([]) // Initialize licenses array
    });
  
    this.addLicense();
    
    this.licenses.valueChanges.subscribe((value) => {
      console.log("🟢 Debugging Licenses Array Before Upload:", JSON.stringify(value, null, 2));
    });
  }
  get licenses(): FormArray {
    return this.docForm.get('licenses') as FormArray;
  }
  removeLicense(index: number): void {
    this.licenses.removeAt(index);
  }
  addLicense(): void {
    this.licenses.push(
      this.fb.group({
        licenseType: ['', Validators.required], 
        createdDate: ['', Validators.required], 
        licenseDuration: ['', [Validators.required, Validators.min(1)]], 
        licensePhoto: [null, Validators.required], // ✅ Filename for UI
        licensePhotoFile: [null] // ✅ Ensure it's explicitly initialized as `null`
      })
    );
  }
  
  
  
  

  //metord runs on submit button hit
  async onSubmit() {
    this.submitted = true;
  
    if (this.docForm.invalid || this.loading) {
      return;
    }
  
    this.loading = true;
  
    await this.uploadShopImage();
    await this.uploadManagerAddharFront();
    await this.uploadManagerImage();
  
    console.log("Licenses before upload:", this.licenses.value);
    let licenseUploadPromises = this.licenses.controls.map(async (licenseControl, index) => {
      let license = licenseControl.value;
      let file = licenseControl.get('licensePhotoFile')?.value; 
  
      console.log(` Processing License ${index + 1}:`, license);
      console.log(` File at index ${index}:`, file);
  
      if (!file) {
        console.error(` License file missing at index ${index}`);
        this._toastrService.error(`License file missing at index ${index}`);
        return Promise.reject(`License file missing at index ${index}`);
      }
  
      return this.uploadLicenseImage(file, license.licenseType, license.createdDate, license.licenseDuration);
    });
  
    await Promise.all(licenseUploadPromises).catch((err) => {
      console.error("Error uploading licenses:", err);
      this._toastrService.error("Some licenses failed to upload.");
    });
  
    if (!this.docObjects || this.docObjects.length === 0) {
      this._toastrService.error("No documents uploaded. Please check your files.");
      this.loading = false;
      return;
    }
  
    console.log("✅ Final docObjects:", this.docObjects);
  
    this._registerService.updateFboBasicDocStatus(
      this.fboData.fboInfo._id,
      this.fboData.fboInfo.customer_id,
      this.docObjects
    ).subscribe({
      next: res => {
        this._toastrService.success('', `Docs Uploaded Successfully.`);
        this.loading = false;
        location.reload();
      },
      error: err => {
        this.loading = false;
        this._toastrService.error('', `Docs Uploading Error.`);
      }
    });
  }
  


  //setting form validation
  setFormValidation() {
    this.docForm = this.formBuilder.group({
      managerName: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['', Validators.required],
      shopPhoto: ['', [Validators.required, this.validateFileType(['png', 'jpg', 'jpeg'])]],
      managerPhoto: ['', [Validators.required, this.validateFileType(['png', 'jpg', 'jpeg'])]],
      managerAadhar: ['', [Validators.required, this.validateFileType(['png', 'jpg', 'jpeg'])]],
      createdDate: ['', Validators.required],  // Ensure it's included
    licenseDuration: ['', [Validators.required, Validators.min(1)]]
    });
    
    this.getDocsObjs();
  }


  fetchAllLicense(city_id:any,business_type_id:any): void {
    this._getdataService.getLicenseByCityIdBusinesstypeid(city_id,business_type_id).subscribe(response => {
      if (response.success) {
        console.log("response===>",response);
        this.Licenses = response.licenses.mandatory_licenses;        ;

      }
    });
  }
  //get file on file upload
  onImageChangeFromFile($event: any, fileType: string) {
    if ($event.target.files && $event.target.files.length) {
      let files = $event.target.files;
      console.log(` Files selected for ${fileType}:`, files);
  
      if (files[0].type === "image/jpeg" || files[0].type === "image/jpg" || files[0].type === "image/png") {
        switch (fileType) {
          case 'managerPhoto':
            this.managerPhotoFile = files[0];
            this.managerPhoto = `managerphoto${new Date().getTime()}.${this._utilServives.getExtention(this.managerPhotoFile.name)}`;
            break;
  
          case 'shopPhoto':
            this.shopPhotoFile = files[0];
            this.shopPhoto = `shopphoto${new Date().getTime()}.${this._utilServives.getExtention(this.shopPhotoFile.name)}`;
            break;
  
          case 'aadharPhoto':
            this.aadharFile = files;  // ✅ Set the array properly
            this.aadhar[0] = `aadharfront${new Date().getTime()}.${this._utilServives.getExtention(files[0].name)}`;
            if (files.length > 1) {
              this.aadhar[1] = `aadharback${new Date().getTime()}.${this._utilServives.getExtention(files[1].name)}`;
            }
            break;
  
          // case 'licensePhoto':
          //   this.licensePhotoFile = files[0];
          //   this.licensePhoto = `license${new Date().getTime()}.${this._utilServives.getExtention(this.licensePhotoFile.name)}`;
          //   break;
        }
      } else {
        console.error(" Invalid file type selected.");
        this._toastrService.error("Invalid file type. Only .png, .jpg, or .jpeg files are allowed.");
      }
    }
  }
  
  //methord for uploading particular docs 
  uploadDoc(name: string, format: string, isMultiDoc: boolean, handlerId: string, document: any) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('format', format.toLowerCase());
    formData.append('panelType', 'Fostac');
    formData.append('multipleDoc', isMultiDoc.toString());
    formData.append('handlerId', handlerId);

    if (isMultiDoc) {
      document.forEach((file: any) => {
        formData.append('document', file);
      });
    } else {
      formData.append('document', document);
    }

    let saveDocument: any;

    if (this.serviceType == 'Fostac') {
      saveDocument = this._registerService.saveFostacDocument(formData);
    } else if (this.serviceType == 'Foscos') {
      saveDocument = this._registerService.saveFoscosDocument(formData);
    } else if (this.serviceType == 'HRA' || this.serviceType == 'Medical' || this.serviceType == 'Water Test Report') {
      saveDocument = this._registerService.saveHraDocument(formData);
    }

    return new Promise((resolve, reject) => {
      saveDocument.subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (err: any) => {
          reject(err);
        }
      });
    });

  }


  //getting docs to view
  getDocsObjs(): void {
    // let docs = this.fboData.docs[0].documents;

    this._getdataService.getDocs(this.fboData.fboInfo.customer_id).subscribe({
      next: res => {
        let docs = res.docs;
        this.managerPhotoObj = docs.find((doc: any) => doc.name === 'Manager Photo');
        this.managerAadharObj = docs.find((doc: any) => doc.name === 'Manager Aadhar');
        this.shopPhotoObj = docs.find((doc: any) => doc.name === 'Shop Photo');
        this.licenseObj = docs.find((doc: any) => doc.name === 'Foscos License');
      }
    })
}


  //open view document modal
  viewDocument(name: string, res: any, format: string, isMultiDoc: boolean): void { // methord for calling viewdoc component for a particucar doc

    let obj = {
      name: name,
      src: isMultiDoc ? res : [res.toString()], // we will put single src in array because our component needs array of src for showing docs
      format: format,
      multipleDoc: isMultiDoc
    }
    const modalRef = this.modalService.open(ViewDocumentComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.doc = obj;
  }


  //file extention validator
  validateFileType(allowedExtensions: string[]) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const file = control.value;
      if (file) {
        const fileExtension = file.split('.').pop()?.toLowerCase();
        if (fileExtension && allowedExtensions.find(item => item === fileExtension)) {
          return null;
        } else {
          return { invalidFileType: true };
        }
      }

      return null;
    };
  }

  //file num validation
  validateFileNumber(maxFiles: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const files = control.value;
      if (files && files.length > maxFiles) {
        return { invalidFileNumber: true };
      }
      return null;
    };
  }

  //methord for uploading shop image
  uploadShopImage(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._getdataService.getSalesBasicDocUploadURL(this.shopPhoto, this.shopPhotoFile.type).subscribe({
        next: res => {
          this._registerService.uplaodDocstoS3(res.uploadUrl, this.shopPhotoFile).subscribe({
            next: res => {

              this.docObjects.push({ name: 'Shop Photo', format: 'Image', isMultiDoc: false, src: [this.shopPhoto] });
              resolve(res);
              // this._toastrService.success('Done')
            },
            error: err => {
              this.loading = false;
              reject(err);
              this._toastrService.error('Shop Image Uploading Problem')
            }
          });
        }
      })
    })
  }

  //methord for uploading manager aadhar front
  uploadManagerAddharFront(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._getdataService.getSalesBasicDocUploadURL(this.aadhar[0], (this.aadharFile as any)[0].type).subscribe({
        next: res => {
          this._registerService.uplaodDocstoS3(res.uploadUrl, (this.aadharFile as any)[0]).subscribe({
            next: res => {
              if(!this.aadhar[1]){
                this.docObjects.push({ name: 'Manager Aadhar', format: 'Image', isMultiDoc: false, src: this.aadhar });
              }

              resolve(res);
              // this._toastrService.success('Done')
            },
            error: err => {
              this.loading = false;
              reject(err);
              this._toastrService.error('Manager Aadhar Uploading Problem')
            }
          });
        }
      })
    })
  }

  //methord for uploading manager aadhar Back
  uploadManagerAddharBack(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._getdataService.getSalesBasicDocUploadURL(this.aadhar[1], (this.aadharFile as any)[1].type).subscribe({
        next: res => {
          this._registerService.uplaodDocstoS3(res.uploadUrl, (this.aadharFile as any)[1]).subscribe({
            next: res => {
              this.docObjects.push({ name: 'Manager Aadhar', format: 'Image', isMultiDoc: true, src: this.aadhar });
              resolve(res);
              // this._toastrService.success('Done')
            },
            error: err => {
              this.loading = false;
              reject(err);
              this._toastrService.error('Manager Aadhar Uploading Problem')
            }
          });
        }
      })
    })
  }

  //methord for uploading manager image
  uploadManagerImage(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._getdataService.getSalesBasicDocUploadURL(this.managerPhoto, this.managerPhotoFile.type).subscribe({
        next: res => {
          this._registerService.uplaodDocstoS3(res.uploadUrl, this.managerPhotoFile).subscribe({
            next: res => {
              this.docObjects.push({ name: 'Manager Photo', format: 'Image', isMultiDoc: false, src: [this.managerPhoto] });
              resolve(res);
              // this._toastrService.success('Done')
            },
            error: err => {
              this.loading = false;
              reject(err);
              this._toastrService.error('Manager Image Uploading Problem')
            }
          });
        }
      })
    })
  }

  onLicenseFileChange(event: any, index: number): void {
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
  
      console.log(`📌 File selected for License (${index}):`, file);
  
      if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png") {
        const licenseGroup = this.licenses.at(index) as FormGroup;
  
        // ✅ Generate a safe filename (only for display)
        const newFileName = `license${new Date().getTime()}.${this._utilServives.getExtention(file.name)}`;
  
        // ✅ Only update the filename for UI display
        licenseGroup.patchValue({
          licensePhoto: newFileName  // Will not be assigned to <input type="file">
        });
  
        // ✅ Store the actual file in a hidden FormControl
        licenseGroup.setControl('licensePhotoFile', new FormControl(file));
  
        console.log(`✅ Updated License at index ${index}:`, licenseGroup.value);
      } else {
        console.error("❌ Invalid file type selected.");
        this._toastrService.error("Invalid file type. Only .png, .jpg, or .jpeg files are allowed.");
      }
    } else {
      console.error("❌ No file selected.");
    }
  }
  
  
// Method for uploading license image
  uploadLicenseImage(file: File, licenseId: string, issuedDate: string, years: string): Promise<any> {
    console.log(" Uploading License File:", file);
  
    return new Promise((resolve, reject) => {
      this._getdataService.getSalesBasicDocUploadURL(file.name, file.type).subscribe({
        next: res => {
          this._registerService.uplaodDocstoS3(res.uploadUrl, file).subscribe({
            next: res => {
              console.log(`Uploaded license file: ${file.name}`);
              const selectedLicense = this.Licenses.find(license => license._id === licenseId);

              // Get the name if found, otherwise set a default or empty string
              const licenseName = selectedLicense ? selectedLicense.name : 'Unknown License';
              this.docObjects.push({
                name: licenseName,
                format: 'Image',
                isMultiDoc: false,
                src: [file.name],
                issuedDate: issuedDate,
                licenseDuration: years,
                licenseId:licenseId
              });
  
              console.log(" Updated docObjects:", this.docObjects);
  
              resolve(res);
            },
            error: err => {
              console.error(" License Upload Failed:", err);
              this.loading = false;
              reject(err);
              this._toastrService.error('License Uploading Failed');
            }
          });
        },
        error: err => {
          console.error(" Error getting upload URL:", err);
          reject(err);
        }
      });
    });
  }
  
  
  
}
