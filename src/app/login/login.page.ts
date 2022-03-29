import { Component, OnInit } from '@angular/core';
import {  FormGroup, 
          FormControl, 
          Validators, 
          FormBuilder } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;
  usuario: string;
  contraseña: string;
  data: any;

  constructor(
    public fb: FormBuilder, 
    public alertControler: AlertController,
    public restService: RestService,
    public loadingCtrl: LoadingController,
    public router: Router,
    )
    {
    this.data = null;
    this.formularioLogin = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })

  }

  ngOnInit() {

  }

  async login(){

    if(this.formularioLogin.invalid){
      const alert = await this.alertControler.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los campos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
    

    const loading = await this.loadingCtrl.create({});
    loading.present();
     setTimeout(() => {
      loading.dismiss();
      this.restService.loginReal(this.formularioLogin.value.email, this.formularioLogin.value.password)
    .then(data => {
      this.data = data;
      console.log(this.data.data.type);
      if(this.data.data.type == 'a'){
        this.router.navigate(['/administration'])
      } else{
        
      }

    }) .catch(async error=>{console.log(error)
        const alert = await this.alertControler.create({
          header: 'Datos incompletos',
          message: 'El email o la contraseña no son correctos.',
          buttons: ['Aceptar'],
        });
        await alert.present();
        return;
    });
    },100);
  }
}

