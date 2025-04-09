import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetdataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-consumer-settings',
  templateUrl: './consumer-settings.component.html',
  styleUrls: ['./consumer-settings.component.scss']
})
export class ConsumerSettingsComponent implements OnInit {
  consumerForm!: FormGroup;
  changePasswordForm!: FormGroup;

  constructor(private fb: FormBuilder,private getDataService: GetdataService) {}

  ngOnInit(): void {
    const consumer = JSON.parse(localStorage.getItem('consumer') || '{}');

    this.consumerForm = this.fb.group({
      customer_name: [consumer.customer_name || '', Validators.required],
      iiest_member_id: [{ value: consumer.iiest_member_id || '', disabled: true }, Validators.required],
      email: [consumer.email || '', [Validators.required, Validators.email]],
      contact_no: [consumer.contact_no || '', Validators.required],
    });

    this.changePasswordForm = this.fb.group({
      current_password: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
    
  }

  onSubmit(): void {
    if (this.consumerForm.valid) {
      const formValues = this.consumerForm.value;
      const consumer = JSON.parse(localStorage.getItem('consumer') || '{}');
  
      const id = consumer._id; // make sure _id exists in localStorage
  
      this.getDataService.updateCustomer(id, formValues.customer_name, formValues.contact_no)
        .subscribe({
          next: (response) => {
            console.log('Customer updated successfully:', response);
            alert('Customer updated successfully! 🎉');
            // Optionally update localStorage
            localStorage.setItem('consumer', JSON.stringify(response.data));
          },
          error: (error) => {
            console.error('Error updating customer:', error);
            alert('Failed to update customer.');
          }
        });
    } else {
      this.consumerForm.markAllAsTouched(); // Show validation errors
    }
  }
  

  onPasswordChange(): void {
    if (this.changePasswordForm.valid) {
      const formValues = this.changePasswordForm.value;
      const consumer = JSON.parse(localStorage.getItem('consumer') || '{}');
  
      this.getDataService.changePassword(consumer._id, formValues.current_password, formValues.new_password)
        .subscribe({
          next: (response) => {
            console.log('Password changed successfully:', response);
            alert('Password changed successfully! 🎉');
            this.changePasswordForm.reset(); // Clear form after success
          },
          error: (error) => {
            console.error('Error changing password:', error);
            alert(error.error.message || 'Failed to change password.');
          }
        });
    } else {
      this.changePasswordForm.markAllAsTouched(); // Show validation errors
    }
  }
  
  
  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('new_password')?.value;
    const confirmPassword = form.get('confirm_password')?.value;
  
    if (newPassword !== confirmPassword) {
      form.get('confirm_password')?.setErrors({ passwordMismatch: true });
    } else {
      const errors = form.get('confirm_password')?.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        if (Object.keys(errors).length === 0) {
          form.get('confirm_password')?.setErrors(null);
        }
      }
    }
  }
  
}
