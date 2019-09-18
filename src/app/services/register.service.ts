import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registers: Register[] = [];

  constructor() { }

  saveRegister(format: string, text: string) {
    const newRegister = new Register(format, text);
    this.registers.unshift(newRegister);
  }
}
