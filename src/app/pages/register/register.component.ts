import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/models/AuthentificationResponse';
import { RegisterRequest } from 'src/app/models/RegisterRequest';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerError: string | null = null;
  authRequest: RegisterRequest = {};
  authResponse: AuthenticationResponse = {};
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  register() {
    console.log(this.authRequest) 
    this.authService.register(this.authRequest)
      .subscribe({
        next: (response) => {
          this.authResponse = response;
            localStorage.setItem('token', response.accessToken as string);
            this.router.navigate(['home']);
        }
      });
  }
}
