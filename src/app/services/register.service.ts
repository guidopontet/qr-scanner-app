import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registers: Register[] = [];

  constructor(
    private storage: Storage,
    private navController: NavController,
    private inAppBrowser: InAppBrowser
  ) {
    this.loadRegisters();
  }

  async loadRegisters() {
    this.registers = await this.storage.get('registers') || [];
  }

  async saveRegister(format: string, text: string) {
    await this.loadRegisters();

    const newRegister = new Register(format, text);
    this.registers.unshift(newRegister);
    this.storage.set('registers', this.registers);
    this.openRegister(newRegister);
  }

  openRegister(register: Register) {
    this.navController.navigateForward('/tabs/tab2');

    switch (register.type) {
      case 'http':
        this.inAppBrowser.create(register.text, '_system'); // Open on default browser
        break;
      case 'geo':
        this.navController.navigateForward(`/tabs/tab2/map/${register.text}`);
        break;
      default:
        break;
    }
  }
}
