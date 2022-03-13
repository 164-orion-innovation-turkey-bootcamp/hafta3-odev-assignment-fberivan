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

  // Hata mesajını saklayan değişken
  submitError: string | undefined

  // FormGroup nesnesi
  registerForm = new FormGroup({
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
    let user = this.registerForm.value
    // kayıt olmak için servis isteği
    this.service.register(user).subscribe(res => {
      // objenin property'leri yoksa hata alınmış demektir
      if(Object.keys(res).length==0){
        this.submitError = "User cannot created!"
        this.registerForm.reset()
      }else{
        this.router.navigate(['login'])
      }
    })
  }

  // form içerisindeki mail alanına erişimi saplayan get fonksiyonu
  get mail() { return this.registerForm.get('mail')!; }

  // form içerisindeki pass alanına erişimi saplayan get fonksiyonu
  get pass() { return this.registerForm.get('pass')!; }

}
