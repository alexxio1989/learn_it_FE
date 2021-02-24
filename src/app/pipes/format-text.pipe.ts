import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatText'
})
export class FormatTextPipe implements PipeTransform {

  

  transform(value: string): string {  
    if(value.length > 25){
      return '<h5 class="pl-3 pr-3">' + value + '</h5>';  
    } 
    return '<h5>' + value + '</h5>';  
  } 

}
