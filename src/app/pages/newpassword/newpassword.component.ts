import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetpasswordService } from 'src/app/services/resetpassword.service';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})


export class NewpasswordComponent implements OnInit {
  status : string | undefined  ;
  token!: any;

  formRequest: FormGroup = new FormGroup({
    password: new FormControl('', [ Validators.required,  ]),
    confirmPassword: new FormControl('', [
      Validators.required,
     
    ])
  });
  

 constructor(private router: Router,
    private route: ActivatedRoute,
    private resetpasswordService: ResetpasswordService)
  {} 

  ngOnInit(): void {
   this.token = this.route.snapshot.queryParamMap.get('token');
  }


  resetpassword()
  {
    if(this.formRequest.valid && this.token && this.formRequest.value.password === this.formRequest.value.confirmPassword){
      this.resetpasswordService.reset(this.token,this.formRequest.value.password).subscribe({
        next : (response) => 
        {
          console.log(response)
          if(response.status==="Password reset successfully!")
              this.router.navigate(['/login']);
            
            else{
              this.status= response.status;
            }
        }
      })
    }
    else 
    {this.status="Verify passwords!"}

  }


}
