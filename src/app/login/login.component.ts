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

  // Hata mesajını saklayan değişken
  submitError: string | undefined

  // FormGroup nesnesi
  loginForm = new FormGroup({
    // mail alanı için validator'lar
    mail: new FormControl('', [Validators.required, Validators.email]),
    // şifre alanı için validator'lar
    pass: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(private service: AppService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // form değerlerinin object olarak alınması
    let user = this.loginForm.value
    // login olmak için servis isteği
    this.service.login(user.mail, user.pass).subscribe(res => {
      // res nesnesi array olarak gelmektedir, içinde eleman yoksa kullanıcı bulunamamıştır
      if(res.length != 0){
        localStorage.setItem("user", JSON.stringify(res[0]))
        this.router.navigate(['dashboard'])
      }else{
        this.submitError = "Wrong user credentials!"
        this.loginForm.reset()
      }
    })
  }

  // form içerisindeki mail alanına erişimi saplayan get fonksiyonu
  get mail() { return this.loginForm.get('mail')!; }

  // form içerisindeki pass alanına erişimi saplayan get fonksiyonu
  get pass() { return this.loginForm.get('pass')!; }
}
