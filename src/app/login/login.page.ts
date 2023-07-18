import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup = new FormGroup({});
  showPwd: boolean = false;

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

  async login(){
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authService.login(this.credentials.value);
    console.log(user);
    await loading.dismiss();

    if(user){
      this.router.navigateByUrl('/home',{replaceUrl: true});
    } else{
      this.showAlert('Login failed!','Please try again');
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

  togglePasswordVisibility() {
    this.showPwd = !this.showPwd;
  }

  goToRegisterPage(){
    this.router.navigateByUrl('/signup',{replaceUrl: true});
  }
}
