import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  credentials: FormGroup = new FormGroup({});
  showPwd1: boolean = false;
  showPwd2: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
    ) {}

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    });
  }

  async register(){
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if(user){
      this.router.navigateByUrl('/home',{replaceUrl: true});
    } else{
      this.showAlert('Registration failed!','Please try again!');
    }
  }

  async showAlert(header:string, message: string){
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  togglePassword1Visibility() {
    this.showPwd1 = !this.showPwd1;
  }

  togglePassword2Visibility() {
    this.showPwd2 = !this.showPwd2;
  }

  goToLoginPage(){
    this.router.navigateByUrl('',{replaceUrl: true});
  }
}
