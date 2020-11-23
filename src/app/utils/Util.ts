import { User } from '../model/User';

// OBJECTS

export function isNotNullObj<T>(arg: T ){
    return arg !== undefined && arg !== null;
}

// STRINGS

export function areSemeStrings(value1: string , value2: string): boolean{
    return isNotEmptyString(value1) && isNotEmptyString(value2) && value1 === value2;
}

export function isNotEmptyString(value: string): boolean{
    return value !== undefined && value !== '';
}

export function isEmptyString(value: string): boolean{
    return value === undefined || value === '';
}

// ARRAYS

export function isEmptyArray(value: any[]): boolean{
    return value === null || value === undefined || value.length === 0;
}

export function isNotEmptyArray(value: any[]): boolean{
    return value !== null || value !== undefined || value.length > 0;
}



// VARIE

export function getUserLS(): User{
    let value = localStorage.getItem('USER');
    return JSON.parse(value);
}

export function isSameUser(user1: User , user2: User): boolean{
    return isNotNullObj(user1) && isNotNullObj(user2) && areSemeStrings(user1.email,user2.email);
}

export function isSameUserID(user1: User , id: number): boolean{
    return isNotNullObj(user1) && user1.id === id;
}