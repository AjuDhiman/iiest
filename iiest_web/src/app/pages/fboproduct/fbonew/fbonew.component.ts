import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { waterTestFee, clientType, paymentMode, licenceType } from '../../../utils/config';
import { RegisterService } from '../../../services/register.service';
import { GetdataService } from '../../../services/getdata.service';
import { ToastrService } from 'ngx-toastr';
import { FostacComponent } from '../fostac/fostac.component';
import { FoscosComponent } from '../foscos/foscos.component';
import { MultiSelectComponent } from 'src/app/shared/multi-select/multi-select.component';


@Component({
  selector: 'app-fbonew',
  templateUrl: './fbonew.component.html',
  styleUrls: ['./fbonew.component.scss']
})
export class FbonewComponent implements OnInit {
  @ViewChild(FostacComponent, { static: false }) fostacChildComponent: FostacComponent;
  @ViewChild(FoscosComponent, { static: false }) foscosChildComponent: FoscosComponent;
  isQrCode = false;
  userName: string = '';
  userData: any;
  processAmnts: any = {};
  servicesNames: any = {};
  minValue: number = 1;
  loggedUser: any;
  objId: string;
  editedData: any;
  parsedUserData: any;
  submitted = false;
  waterTestFee = waterTestFee;
  clientType = clientType;
  paymentMode = paymentMode;
  licenceType = licenceType;
  isDisabled: boolean = true;
  fboGeneralData: any;
  productList: any;
  productName: any;
  addFbo: any;
  isFostac: boolean = false;
  isFoscos: boolean = false;
  isEditMode: boolean = false;
  formType: string = "Registration";
  isReadOnly: boolean = false;
  resetMultiDrop: boolean;
  need_gst_number: boolean = false;
  isBusinessTypeB2B: boolean = false;
  selected: any; // related to multi drop-down, remove it if are removing multi-dropdown component
  fostac_processAmnt: number = 0;
  foscos_processAmnt: number = 0;
  maxSelectedItems: number = 2;
  @ViewChild(MultiSelectComponent) multiSelect !: MultiSelectComponent;
  isExisting: boolean;
  existingUserForm : FormGroup;
  //New Variables by vansh on 5-01-23 for exsisting 
  searchSuggestions: Array<{ fbo_name: string; customer_id: string }>;
  isSearchFocused=true;
  @ViewChild('myInput') searchElem: any;

  existingFbos: Array<{ fbo_name: string; customer_id: string }> = [
    {
      fbo_name: "Vansh",
      customer_id: "IIEST/90876",
    },
    {
      fbo_name: "Aarav",
      customer_id: "IIEST/90877",
    },
    {
      fbo_name: "Ishaan",
      customer_id: "IIEST/90878",
    },
    {
      fbo_name: "Riya",
      customer_id: "IIEST/90879",
    },
    {
      fbo_name: "Anaya",
      customer_id: "IIEST/90880",
    },
    {
      fbo_name: "Arjun",
      customer_id: "IIEST/90881",
    },
    {
      fbo_name: "Aanya",
      customer_id: "IIEST/90882",
    },
    {
      fbo_name: "Vihaan",
      customer_id: "IIEST/90883",
    },
    {
      fbo_name: "Advait",
      customer_id: "IIEST/90884",
    },
    {
      fbo_name: "Avni",
      customer_id: "IIEST/90885",
    },
    {
      fbo_name: "Aarush",
      customer_id: "IIEST/90886",
    },
    {
      fbo_name: "Anika",
      customer_id: "IIEST/90887",
    },
    {
      fbo_name: "Kabir",
      customer_id: "IIEST/90888",
    },
    {
      fbo_name: "Siya",
      customer_id: "IIEST/90889",
    },
    {
      fbo_name: "Aryan",
      customer_id: "IIEST/90890",
    },
    {
      fbo_name: "Sara",
      customer_id: "IIEST/90891",
    },
    {
      fbo_name: "Aadhya",
      customer_id: "IIEST/90892",
    },
    {
      fbo_name: "Rehan",
      customer_id: "IIEST/90893",
    },
    {
      fbo_name: "Anaya",
      customer_id: "IIEST/90894",
    },
    {
      fbo_name: "Ishanvi",
      customer_id: "IIEST/90895",
    },
    // Add more objects as needed
  ];
  
  
  fostac_training: FormGroup = new FormGroup({
    fostac_processing_amount: new FormControl(''),
    fostac_service_name: new FormControl(''),
    fostac_client_type: new FormControl(''),
    recipient_no: new FormControl(''),
    fostac_total: new FormControl('')
  });

  foscos_training: FormGroup = new FormGroup({
    foscos_processing_amount: new FormControl(''),
    foscos_service_name: new FormControl(''),
    foscos_client_type: new FormControl(''),
    shops_no: new FormControl(''),
    water_test_fee: new FormControl(''),
    license_category: new FormControl(''),
    license_duration: new FormControl(''),
    foscos_total: new FormControl(''),
  });

  fboForm: FormGroup = new FormGroup({
    fbo_name: new FormControl(''),
    owner_name: new FormControl(''),
    owner_contact: new FormControl(''),
    email: new FormControl(''),
    state: new FormControl(''),
    district: new FormControl(''),
    village: new FormControl(''),
    tehsil: new FormControl(''),
    address: new FormControl(''),
    pincode: new FormControl(''),
    product_name: new FormControl([]),
    business_type: new FormControl('b2c'),
    payment_mode: new FormControl(''),
    createdBy: new FormControl(''),
    grand_total: new FormControl('')
  })
  


  constructor(
    private formBuilder: FormBuilder,
    private _getFboGeneralData: GetdataService,
    private _registerService: RegisterService,
    private _toastrService: ToastrService,
    private existingFrom :FormBuilder
  ) {
    this.getFboGeneralData();
  }
  ngOnInit(): void {
    this.userData = this._registerService.LoggedInUserData();
    this.parsedUserData = JSON.parse(this.userData)
    this.userName = this.parsedUserData.employee_name;

    this.fostac_training = this.formBuilder.group({
      fostac_processing_amount: ['', Validators.required],
      fostac_service_name: ['', Validators.required],
      fostac_client_type: ['', Validators.required],
      recipient_no: ['', Validators.required],
      fostac_total: ['', Validators.required]
    });

    this.foscos_training = this.formBuilder.group({
      foscos_processing_amount: ['', Validators.required],
      foscos_service_name: ['', Validators.required],
      foscos_client_type: ['', Validators.required],
      shops_no: ['', Validators.required],
      water_test_fee: ['', Validators.required],
      license_category: ['', Validators.required],
      license_duration: ['', Validators.required],
      foscos_total: ['', Validators.required]
    });
    this.existingUserForm = this.existingFrom.group({
      existingUser:[''],
      searchUser: ['', Validators.required]
    })

    this.fboForm = this.formBuilder.group(
      {
        fbo_name: ['', Validators.required],
        owner_name: ['', Validators.required],
        owner_contact: ['',
          [
            Validators.required,
            Validators.pattern(/^[0-9]{10}$/)
          ]],
        email: ['',
          [
            Validators.required,
            Validators.email,
          ]],
        state: ['', Validators.required],
        district: ['', Validators.required],
        address: ['', Validators.required],
        village: [''],
        tehsil: [''],
        pincode: [''],
        product_name: [[], Validators.required],
        business_type: ['b2c', Validators.required],
        payment_mode: ['', Validators.required],
        createdBy: ['', Validators.required],
        grand_total: ['', Validators.required],
      });

    this.fboForm.patchValue({ createdBy: `${this.userName}(${this.parsedUserData.employee_id})` })
  }
  get fbo(): { [key: string]: AbstractControl } {
    return this.fboForm.controls;
  }


  setRequired() {
    return [Validators.required];
  }

  existingUser($event:any){
    this.isExisting = $event.target.checked
    
  }

  filterSearch(event:any){
    console.log(event.target.value);
    let regex = new RegExp(event.target.value, "i") // i means case insesitive
    //using regex for comparing fbo names and customer ids
    this.searchSuggestions = this.existingFbos.filter((obj:any) => regex.test(obj.fbo_name) || regex.test(obj.customer_id));
    this.searchSuggestions = this.searchSuggestions.slice(0,5);
    console.log(this.searchSuggestions);
  }

  showExistingUser(){
    console.log(11);
  }
  //Form Submit Method
  onSubmit() {

    this.loggedUser = this._registerService.LoggedInUserData();
    this.objId = JSON.parse(this.loggedUser)._id;
    this.submitted = true;
    console.log(this.fboForm.value);
    if (this.fboForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.editedData = this.fboForm.value;
      this._registerService.updateFbo(this.objId, this.editedData, `${this.userName}(${this.parsedUserData.employee_id})`).subscribe({
        next: (res) => {
          if (res.success) {
            this._toastrService.success('', 'Record Edited Successfully');
            this.backToRegister();
          }
        }
      });
    } else {
      this.addFbo = this.fboForm.value;
      if (this.addFbo.payment_mode === 'Pay Page') {
        this._registerService.fboPayment(this.objId, this.addFbo).subscribe({
          next: (res) => {
            window.location.href = res.message;
          },
          error: (err) => {
            let errorObj = err.error;
            if (errorObj.userError) {
              this._registerService.signout();
            } else if(errorObj.contactErr){
              this._toastrService.error('', 'This Contact Already Exists.');
            } else if(errorObj.emailErr){
              this._toastrService.error('', 'This Email Already Existis');
            } else if(errorObj.signatureErr){
              this._toastrService.error('', 'Signature Not Found');
            } else if(errorObj.registerErr){
              this._toastrService.error('', 'Some Error Occured. Please Try Again');
            }
          }
        })
      } else {
        console.log(this.addFbo)
        this._registerService.addFbo(this.objId, this.addFbo).subscribe({
          next: (res) => {
            if (res.success) {
              this._toastrService.success('', 'Record Added Successfully');
              this.backToRegister();
            }
          },
          error: (err) => {
            let errorObj = err.error;
            if (errorObj.userError) {
              this._registerService.signout();
            } else if (errorObj.contactErr){
              this._toastrService.error('', 'This Contact Already Exists.');
            } else if (errorObj.emailErr){
              this._toastrService.error('', 'This Email Already Exists.');
            } else if(errorObj.signatureErr){
              this._toastrService.error('', 'Signature Not Found');
            } else if(errorObj.registerErr){
              this._toastrService.error('', 'Some Error Occured. Please Try Again');
            }
          }
        })
      }
    }
  }

  //Get Fbo General Data
  getFboGeneralData() {
    this._getFboGeneralData.getFboGeneralData().subscribe({
      next: (res) => {
        this.fboGeneralData = res.product_name;
        this.fboGeneralData = Object.entries(this.fboGeneralData).map(([key, value]) => ({ key, value }));
        console.log(this.fboGeneralData);
        this.productList = Object.keys(res.product_name);
        for (let productName in res.product_name) {
          let product = res.product_name[productName];
          this.processAmnts[productName] = product['processing_amount'];
          this.servicesNames[productName] = product['service_name'];
        }
      },
      error: (err) => {
        let errorObj = err.error
        if (errorObj.userError) {
          this._registerService.signout();
        }
      }
    })
  }

  //Reset the form
  onReset(): void {
    this.submitted = false;
    this.fboForm.reset();
    this.need_gst_number = false; // this will hide gst number on form reset 
    this.isFostac = false;
    this.isFoscos = false;
    this.fboForm.removeControl('gst_number')// this will remove gst number form control on form reset 
    this.fboForm.removeControl('fostac_training');
    this.fboForm.removeControl('foscos_training');
  }

  getSelectedProduct($event: any) {

    this.productName = $event;
    this.fboForm.patchValue({ product_name: this.productName })
    var filtered = this.fboGeneralData.filter((a: any) => this.productName.find((item: any) => item === a.key))
    console.log(filtered);

    this.isFostac = false;
    this.isFoscos = false;
    if (this.productName.find((item: any) => item === 'Fostac Training')) {
      this.isFostac = true;
      this.fboForm.addControl('fostac_training', this.fostac_training);
    }
    else {
      this.fboForm.removeControl('fostac_training');
    }
    if (this.productName.find((item: any) => item === 'Foscos Training')) {
      this.isFoscos = true;
      this.fboForm.addControl('foscos_training', this.foscos_training);
    }
    else {
      this.fboForm.removeControl('foscos_training');
    }

  }

  backToRegister() {
    this.submitted = false;
    this.isEditMode = false;
    this.fboForm.reset();
  }

  isEditRecord(param: any) {
    console.log(param.Record);
    this.isEditMode = param.isEditMode;
    const record = param.Record;
    this.objId = record._id
    console.log(record);
    this.formType = "Edit"
    this.fboForm.setValue({
      fbo_name: record.fbo_name,
      owner_name: record.owner_name,
      owner_contact: record.owner_contact,
      email: record.email,
      state: record.state,
      district: record.district,
      address: record.address,
      product_name: record.product_name,
      processing_amount: record.processing_amount,
      service_name: record.service_name,
      client_type: record.client_type,
      recipient_no: record.recipient_no,
      water_test_fee: record.water_test_fee,
      payment_mode: record.payment_mode,
      createdBy: record.createdBy,
      license_category: record.license_category,
      license_duration: record.license_duration,
      total_amount: record.total_amount
    })
  }

  ModeofPayment(event: any) {
    if (this.fboForm.value.total_amount !== '' && event.target.value == 'Pay Page') {
      this.isQrCode = true;
    } else {
      this.isQrCode = false;
    }
  }

  // Method to clear the child component's form
  clearChildForm(val:string) {
    if (val === 'fostac') {
      this.fostacChildComponent.resetForm();
    }
    if (val === 'foscos') {
      this.foscosChildComponent.resetForms();
    }
  }


  // This function conditionally add gst number filled in fbo form (condition: If checkox B2B is true in Business type field)
  onBusinessTypeChange($event: any) {
    let businessType: string = $event.target.value
    console.log(businessType);
    if (businessType) {
      if (businessType === 'b2b') { // If we have business type b2b then we want to add gst number form control
        this.need_gst_number = true;
        this.fboForm.addControl('gst_number', new FormControl('', Validators.required));
      }
      else if (businessType === 'b2c') { // If we have business type b2b then we want to remove gst number form control
        this.need_gst_number = false;
        this.fboForm.removeControl('gst_number');
      }
    } else { //if the check box is not checked then logic will work oppositely
      if (businessType === 'b2b') {
        this.need_gst_number = false;
        this.fboForm.removeControl('gst_number');
      }
      else if (businessType === 'b2c') {
        this.need_gst_number = true;
        this.fboForm.addControl('gst_number', new FormControl('', Validators.required));
      }
    }
  }


  fostacTotalAmount(TotalAmnt: any) {
    this.fostac_processAmnt = TotalAmnt;
    this.fboForm.patchValue({ 'grand_total': TotalAmnt + this.foscos_processAmnt });
  }
  foscosTotalAmount(TotalAmnt: any) {
    this.foscos_processAmnt = TotalAmnt;
    this.fboForm.patchValue({ 'grand_total': TotalAmnt + this.fostac_processAmnt });
  }
}