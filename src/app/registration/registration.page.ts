import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import {  FormGroup, 
          FormControl, 
          Validators, 
          FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  formularioRegistration: FormGroup;
  

  constructor(private route: Router, public fb: FormBuilder, public alertControler: AlertController, public restService : RestService) {

    this.formularioRegistration = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'apellidos': new FormControl("", Validators.required),
      'email': new FormControl("", [Validators.email, Validators.required]),
      'password': new FormControl("", Validators.required),
      'confirmpassword': new FormControl("", Validators.required)
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

  async register(){
    var f = this.formularioRegistration.value;
    console.log(f);
    console.log(this.formularioRegistration.hasError);
    if(this.formularioRegistration.invalid){
      this.crearalert("Datos incompletos","Tienes que llenar todos los campos.");
    }else{

    var usuario = {
      nombre: f.nombre,
      apellidos: f.apellidos,
      company_id: f.company_id,
      email: f.email,
      password: f.password,
      confirmpassword: f.confirmpassword
    }

    if(!(usuario.password === f.confirmpassword)){
      this.crearalert("Contraseña incorrecta","Las contraseñas no coinciden.");
    }else{
      localStorage.setItem('usuario', JSON.stringify(usuario));

      console.log(usuario);
      this.restService.registrarUsuario
      (usuario.nombre, usuario.apellidos, usuario.email, usuario.password, usuario.confirmpassword);
  
      this.crearalert("Registro","Registro realizado con éxito, confirme su correo a traves del correo que le hemos enviado.");
  
      this.route.navigate(['/login']);
      
    }
    }
  }
}
