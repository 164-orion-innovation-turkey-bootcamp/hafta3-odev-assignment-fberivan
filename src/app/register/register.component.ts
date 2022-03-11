import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitError: string | undefined
  registerForm = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(private service: AppService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let user = this.registerForm.value
    this.service.register(user).subscribe(res => {
      if(Object.keys(res).length==0){
        this.submitError = "User cannot created!"
        this.registerForm.reset()
      }else{
        this.router.navigate(['login'])
      }
    })
  }

  get mail() { return this.registerForm.get('mail')!; }

  get pass() { return this.registerForm.get('pass')!; }

}
