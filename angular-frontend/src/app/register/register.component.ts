import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

function onlyInteger(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (/[^0-9]/.test(value)) {
    return { nonInteger: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  registrationForm: FormGroup;
  errors: any[] = [];
  maxMobileLength = 10;
  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      mob: ['', [Validators.required, onlyInteger]],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      console.log('Form data:', formData);
      this.auth.register(this.registrationForm.value).subscribe(
        (response) => {
          console.log('Registration successful', response);
          alert('Registration successful');
          this.router.navigate(['/Home']);

        },
        (error) => {
          console.error('Registration error', error.error); // Access the error message
          // Handle the error and display the error message
          this.errors = error.error;
          location.reload();

        }
      );
      
    }
  }
  onMobileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Remove non-integer characters
    const cleanedValue = inputValue.replace(/[^0-9]/g, '');

    // Limit the input to 10 digits
    if (cleanedValue.length > this.maxMobileLength) {
      // Trim the input to the first 10 digits
      inputElement.value = cleanedValue.slice(0, this.maxMobileLength);
    }
  }

}
