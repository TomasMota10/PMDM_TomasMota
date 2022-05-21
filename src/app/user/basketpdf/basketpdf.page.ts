import { Component, Injectable, OnInit } from '@angular/core';
import { Juego } from 'src/app/administration/interfaces/interface';
import {RestService} from '../../services/rest.service'
import { Platform, AlertController } from '@ionic/angular';
import { BasketLocalStorage } from 'src/app/providers/basket-sqlite';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs=pdfFonts.pdfMake.vfs;

import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';


@Injectable({
  providedIn:'root'
})

@Component({
  selector: 'app-basketpdf',
  templateUrl: './basketpdf.page.html',
  styleUrls: ['./basketpdf.page.scss'],
})
export class BasketpdfPage implements OnInit {
  juegos:Juego[]=[];
  content: string;
  pdfObj=null;


  constructor(
    public platform: Platform,
    public basketLocalStorage: BasketLocalStorage,
    public restService : RestService,
    public file: File,
    public fileOpener: FileOpener,
    public alertCtrl: AlertController,
    public emailComposer:EmailComposer
  ) { }

  ngOnInit() {
    this.getPedidos();
    this.createPdf();
    this.downloadPdf();
  }

  async getPedidos() {
    this.platform.ready().then(()=>{this.juegos=this.basketLocalStorage.getDatabase()});
    this.createPdf().then(() => {
      this.downloadPdf();
      this.juegos = [];
    })
  }

  async createPdf() {
    var docDefinition = {
      content: [
        {image: await this.getBase64ImageFromURL("../../assets/icon/logoFreeToGame.png")},
        { text: 'Games order', style: 'header' },
        { text: 'Date: ' + new Date().toTimeString(), style: 'subheader' },

        this.table(this.juegos)
       
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });}

  downloadPdf() {
    if (this.platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

 table(data) {
  var value = [];
  var column = [];
  column.push({ text: 'Image', style: 'tableHeader'});
  column.push({ text: 'Title', style: 'tableHeader'});
  column.push({ text: 'Description', style: 'tableHeader'});
  value.push(column);
  value.push(column);
  console.log(data);
    for (let i = 0; i < data.length; i++) {
    const juegos = data[i];

    var row = new Array();
    row.push( juegos.thumbnail);
    row.push( juegos.title);
    row.push( juegos.short_description);
    value.push(row);
  }
    return {
        table: {
            widths: [ '*', '*', '*' ],
            headerRows: 1,
            body: value
        }
    };

}
  

  
}
