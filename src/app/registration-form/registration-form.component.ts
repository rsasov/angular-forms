import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from './password-match.validator';

@Component({
  selector: 'app-registration-form',
  imports: [ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent {

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.createRegistrationForm(formBuilder);
  }

  private createRegistrationForm(formBuilder: FormBuilder): FormGroup {
    return this.formBuilder.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        age: ['', [Validators.min(18)]],
        address: this.formBuilder.group({
          street: ['', [Validators.required]],
          city: ['', [Validators.required]],
          postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]]
        })
      },
      {
        validators: passwordMatchValidator('password', 'confirmPassword')
      });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Form Submitted', this.registrationForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  resetForm(): void {
    this.registrationForm.reset();
  }

  isPasswordMismatch(): boolean {
    const passwordControl = this.registrationForm.get('password');
    const confirmPasswordControl = this.registrationForm.get('confirmPassword');
    return passwordControl?.touched && 
    confirmPasswordControl?.touched && 
    confirmPasswordControl?.hasError('passwordMismatch') ||
    false;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.registrationForm.get(controlName);
    return control?.touched && control?.invalid || false;
  }
}
