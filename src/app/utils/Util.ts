import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { User } from '../model/User';

// OBJECTS

export function isNotNullObj<T>(arg: T) {
    return arg !== undefined && arg !== null;
}

export function isNullObj<T>(arg: T) {
    return arg === undefined || arg === null;
}

// STRINGS



export function areSemeStrings(value1: string, value2: string): boolean {
    return isNotEmptyString(value1) && isNotEmptyString(value2) && value1 === value2;
}

export function isNotEmptyString(value: string): boolean {
    return value !== undefined && value !== '';
}

export function isEmptyString(value: string): boolean {
    return value === undefined || value === '';
}

// ARRAYS

export function isEmptyArray(value: any[]): boolean {
    return value === null || value === undefined || value.length === 0;
}

export function isNotEmptyArray(value: any[]): boolean {
    return value !== undefined && value !== null && value.length > 0;
}



// VARIE

export function getUserLS(): User {
    let value = localStorage.getItem('USER');
    return isNotNullObj(value) && value !== 'undefined' ? JSON.parse(value) : null;
}

export function isSameUser(user1: User, user2: User): boolean {
    return isNotNullObj(user1) && isNotNullObj(user2) && user1.id ===  user2.id;
}

export function isSameUserID(user1: User, id: number): boolean {
    return isNotNullObj(user1) && user1.id === id;
}

export function getJWTTOKEN(): string {
    return localStorage.getItem('JWT_TOKEN');
}

export function getHeaders(): HttpHeaders {
    return new HttpHeaders().set("JWT_TOKEN", getJWTTOKEN());
}

export function stringTodate(stringDate: string): Date {
    return moment(stringDate, 'DD/MM/YYYY HH:mm:ss').toDate()
}

export function clearJWTTOKEN(route: Router) {
    const jwt_time = localStorage.getItem('JWT_TIME');
    if (jwt_time !== undefined && jwt_time !== null && jwt_time !== '') {


        let jwt_time_date_millisecons = stringTodate(jwt_time).getTime();

        let time_now_millisecons = stringTodate(new Date().toLocaleString('it-IT')).getTime();


        const diff = time_now_millisecons - jwt_time_date_millisecons;


        let minuto = 1000 * 60;
        let ora = minuto * 60;
        let giorno = ora * 23;

        if (diff > giorno) {

            localStorage.clear();

            localStorage.removeItem('JWT_TIME');
            localStorage.removeItem('USER');
            localStorage.removeItem('TYPES');
            localStorage.removeItem('JWT_TOKEN')
            route.navigate(['/']);
        }
    }
}

export function readFile(file:any){
    return new Promise<HTMLImageElement>((resolve, reject) => {

      const reader = new FileReader();
      var img = document.createElement("img");
      reader.onload = function(e) {
        if(img !== null && e !== null && e.target !== null){
          
          img.src = e.target.result as string
          resolve(img)
        }
      
      }
      reader.readAsDataURL(file);
    });
  }