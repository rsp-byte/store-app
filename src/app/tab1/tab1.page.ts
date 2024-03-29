import { Component } from '@angular/core';

import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { UtilidadesService } from '../services/utilidades.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    public navCntrl: NavController,
    private auth: Auth,
    private router: Router, 
    private alertController: AlertController, 
    private utilidadesService: UtilidadesService
  ) {}

  async login() {
    try {
      console.log(this.name);
      console.log(this.email);
      console.log(this.password);
      const user = await signInWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );
      console.log(user);
      this.loginValidation(user);

    } catch (error) {
      //console.error('Ocurrió un error:', error);
      this.mostrarAlertaCredencialesInvalidas();
    }

    
  }

  gotoSignup() {
    this.navCntrl.navigateForward('signup');
  }

  loginValidation(user: any) {
    if (user) {
      console.log('Inicio de sesión exitoso:', user);
      this.utilidadesService.UUID = user.user.uid  
      this.router.navigate(['/productos']);
    } else {
      console.error(
        'Inicio de sesión fallido: No se recibió un usuario válido'
      );
    }
  }

  async mostrarAlertaCredencialesInvalidas() {
    const alert = await this.alertController.create({
      header: 'Credenciales inválidas',
      message: 'El usuario o la contraseña son incorrectos. Por favor, inténtalo de nuevo.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
