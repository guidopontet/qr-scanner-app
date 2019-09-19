import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registers: Register[] = [];

  constructor(
    private storage: Storage,
    private navController: NavController,
    private inAppBrowser: InAppBrowser,
    private file: File,
    private emailComposer: EmailComposer
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

  sendEmail() {
    const FILE_PATH = this.file.dataDirectory;
    const FILE_NAME = 'register.csv';

    const buildFile = () => {
      const tmp = [];
      const titles = 'Tipo, Formato, Creado, Texto\n';

      tmp.push(titles);

      this.registers.forEach((register: Register) => {
        // Replace ',' for ' ' cause geo includes ',' character
        tmp.push(`${register.type}, ${register.format}, ${register.created}, ${register.text.replace(',', ' ')}\n`);
      });

      return tmp.join('');
    };

    const createCSV = (text: string) => {
      this.file.checkFile(FILE_PATH, FILE_NAME)
        .then(_ => writeToFile(text))
        .catch(e => { // If file does not exist
          return this.file.createFile(FILE_PATH, FILE_NAME, false)
                    .then(_ => writeToFile(text))
                    .catch(console.error);
        });
    };

    const writeToFile = async (text: string) => {
      console.log('escribiendo a archivo')
      console.log(text)
      await this.file.writeExistingFile(FILE_PATH, FILE_NAME, text);
    };

    const sendEmail = () => {
      const email = {
        to: 'info@crassoft.com',
        attachments: [ `${FILE_PATH}${FILE_NAME}`],
        subject: 'Respaldo de Registros',
        body: 'Te adjunto el respaldo de los registros! GLHF!',
        isHtml: true
      };

      // Send a text message using default options
      this.emailComposer.open(email);
    };

    const data = buildFile();
    createCSV(data);
    sendEmail();
  }
}
