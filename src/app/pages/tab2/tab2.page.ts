import { Component } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { Register } from 'src/app/models/register.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public registerService: RegisterService
  ) {}

  sendEmail() {
    this.registerService.sendEmail();
  }

  openRegister(register: Register) {
    this.registerService.openRegister(register);
  }
}
