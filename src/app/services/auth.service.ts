import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public navCntrl: NavController, private auth: Auth) { }

  name: string = "";
  email: string = "";
  password: string = "";

  async signup() {
    const user = await createUserWithEmailAndPassword(
      this.auth,
      this.email,
      this.password
    );
    return user;
  }

  gotoLogin() {
    this.navCntrl.navigateBack('login');
  }


}
