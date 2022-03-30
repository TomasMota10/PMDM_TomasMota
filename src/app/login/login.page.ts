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

  
async crearalert(variableHeader, variableMessage) {
  console.log()
  const alert = await this.alertControler.create({
    header:variableHeader,
    message: variableMessage,
    buttons: ['Aceptar'],
  });
  await alert.present();
  return;
}

  async login(){

    if(this.formularioLogin.invalid){
      this.crearalert("Datos incompletos","Tienes que llenar todos los campos.");
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
      } else if(this.data.data.type == 'u' && this.data.data.actived=='1'){
        console.log('Sesion iniciada con usuario activado')
        this.router.navigate(['/user']);
      }else{
        console.log('El usuario sera activado por el administrador proximamente')
        this.crearalert("Inicio de sesión no valido","El usuario sera activado por el administrador proximamente.");
      }

    }) .catch(async error=>{console.log(error)
      this.crearalert("Datos incompletos","El email o la contraseña no son correctos.");
    });
    },100);
  }
}

