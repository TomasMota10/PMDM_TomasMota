import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'truncate'
})

export class TruncatePipe implements PipeTransform {

    transform(juego: any, length: number = 10, showAll: boolean = false, suffix: string = '...'): any {
    
        if (showAll) {
          return juego.short_description;
        }
        console.log(length);
        if ( juego.short_description.length > length ) {
          
          return juego.short_description.substring(0, length)+' ' + suffix;
        }
        console.log();
        return juego;
      }
}