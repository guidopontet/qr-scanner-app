import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private barcodeScanner: BarcodeScanner
  ) {}

  ionViewWillEnter() {
    console.log('??')
  }

  scan() {
    this.barcodeScanner.scan()
      .then(barcodeData => {
        console.log(barcodeData);
      })
      .catch(err => {
        console.log(err);
      });
  }

}
