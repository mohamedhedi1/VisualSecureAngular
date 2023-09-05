import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/models/AuthentificationRequest';
import { AuthenticationResponse } from 'src/app/models/AuthentificationResponse';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginError: string | null = null;
  authRequest: AuthenticationRequest = {};
  authResponse: AuthenticationResponse = {};
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  authenticate() {
    console.log(this.authRequest) 
    this.authService.login(this.authRequest)
      .subscribe({
        next: (response) => {
          this.authResponse = response;
            localStorage.setItem('token', response.accessToken as string);
            this.router.navigate(['home']);
        }
      });
  }

 
}
