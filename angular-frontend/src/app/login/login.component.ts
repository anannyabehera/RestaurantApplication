import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
function onlyInteger(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (/[^0-9]/.test(value)) {
    return { nonInteger: true };
  }
  return null;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errors: any[] = [];
  maxMobileLength = 10;
  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      mob: ['', [Validators.required, onlyInteger]],
    });
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
  onSubmit() {
    console.log('btn works');
    
    if (this.loginForm.valid) {
      // Form is valid, continue with the submission
      const formData = this.loginForm.value;
      console.log('Form data:', formData);
      this.auth.login(formData).subscribe(
        (response) => {
          console.log('Login successful', response);
          alert('Login successful');
          this.router.navigate(['/tbl']);

        },
        (error) => {
          console.error('Login error', error.error);
          alert('Wrong Credential')
          this.errors = error.error;
          location.reload();

        }
      );
    } else {
      // Form is not valid, handle accordingly (e.g., display validation error messages).
    }
  }
  
}
