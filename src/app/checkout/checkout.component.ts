import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  profileReactiveForm: FormGroup;
  emailerror;
  addresserror;
  usernameerror;
  constructor(private profile: FormBuilder,private router: Router) { 
    ;
  }
  ngOnInit(): void {
    this.profileReactiveForm = this.profile.group({
      username: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.email,Validators.required]],
      address: ['',[Validators.required]]
    });
  }
  get registerFormControl() {
    
    return this.profileReactiveForm.controls;
  }

  handleReactiveFormSubmit()
  {
    // console.log(this.profileReactiveForm.controls['email'].invalid);
    this.usernameerror=this.profileReactiveForm.controls.username.errors;
    this.emailerror=this.profileReactiveForm.controls.email.errors;
    this.addresserror=this.profileReactiveForm.controls.address.errors;
    
    if(this.usernameerror ==null && this.emailerror==null && this.addresserror==null)
    {
      this.router.navigate(['/']);
    }
  }

}
