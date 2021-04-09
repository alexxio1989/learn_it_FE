import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string): string {  
    if(value.length > 25){
      return value.substring(0, 20) + '...';
    } 
    return  value ;  
  } 

}
