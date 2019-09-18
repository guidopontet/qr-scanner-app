import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private registerService: RegisterService
  ) {}

  ionViewWillEnter() {
    this.scan();
  }

  scan() {
    this.barcodeScanner.scan()
      .then(barcodeData => {
        if (!barcodeData.cancelled) {
          this.registerService.saveRegister(barcodeData.format, barcodeData.text);
        }
      })
      .catch(err => {
        console.error(err);
        this.registerService.saveRegister('QRCode', 'https://crassoft.com');
      });
  }

}
