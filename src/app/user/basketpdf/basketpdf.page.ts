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
import { BasketPage } from '../basket/basket.page';


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
  contenido: string;


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
  }


  async getPedidos(){
    this.juegos= await this.basketLocalStorage.getDatabase();
    console.log(this.juegos);
    this.createPdf().then(() => {
      this.downloadPdf();
      
    })
  }

  async createPdf() {
    var docDefinition = {
      content: [
        {image: await this.getBase64ImageFromURL("../../assets/icon/logoFreeToGame.png"), style:'headerlest'},
        { text: '\n FreeToGame.com:', style: 'header' },
        { text: 'Aprobada esta compra por: FreeToGames.com', style: 'subheader' },
        { text: 'Fecha del pedido: ' + new Date().toTimeString(), style: 'subheader' },
        { text: '\n Tu lista de pedido es esta:', style: 'story'},
        this.table(this.juegos)
       
      ],
      styles: {
        headerlest: {
          alignment: 'center',
          width: '300%',
          height: '100px',
        },
        header: {
          alignment: 'center',
          color: 'blue',
          fontSize: 18,
          bold: true,
        },
        subheader: {
          color: 'black',
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

data=this.getPedidos();
 table(data) {
  var value = [];
  var column = [];
  column.push({ text: 'ID del Juego', style: 'tableHeader'});
  column.push({ text: 'Titulo', style: 'tableHeader'});
  column.push({ text: 'Descripción', style: 'tableHeader'});
  column.push({ text: 'Precio', style: 'tableHeader'});
  value.push(column);
  value.push(column);
    for (let i = 0; i < data.length; i++) {
    const juegos = data[i];

    var row = new Array();
    row.push( juegos.id);
    row.push( juegos.title);
    row.push( juegos.short_description);
    row.push("Gratuito");
    value.push(row);
  }
  console.log(data);
    return {
        table: {
            widths: [ '*', '*', '*','*' ],
            headerRows: 1,
            body: value
        }
    };
  
}
  

  
}
