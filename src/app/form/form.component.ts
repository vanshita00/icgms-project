import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service'; // <-- Import the login service

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  showError: boolean = false;
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.userForm.valid) {
      const loginData = {
        email: this.userForm.get('email')?.value,
        password: this.userForm.get('password')?.value,
      };
      const user_type_id = 1; 
      this.loginService.login(user_type_id, loginData).subscribe(
        (response) => {
          localStorage.setItem('access_token', response.access_token);
          this.router.navigate(['/dashboard']);  // Navigate to the dashboard
        },
        (error) => {
          this.showError = true;
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      );
    } else {
      this.showError = true;
    }
  }
  
}
