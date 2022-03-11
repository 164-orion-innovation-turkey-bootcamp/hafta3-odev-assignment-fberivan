import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitError: string | undefined
  loginForm = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(private service: AppService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let user = this.loginForm.value
    this.service.login(user.mail, user.pass).subscribe(res => {
      if(res.length != 0){
        localStorage.setItem("user", JSON.stringify(res[0]))
        this.router.navigate(['dashboard'])
      }else{
        this.submitError = "Wrong user credentials!"
        this.loginForm.reset()
      }
    })
  }

  get mail() { return this.loginForm.get('mail')!; }

  get pass() { return this.loginForm.get('pass')!; }
}
