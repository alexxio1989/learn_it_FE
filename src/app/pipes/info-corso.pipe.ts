import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'infoCorso'
})
export class InfoCorsoPipe implements PipeTransform {

  transform(value: string): string {  
    return value.replace(/<\/?[^>]+(>|$)/g, "");
  } 

}
