
export function isNotEmptyString(value: string): boolean{
    return value !== undefined && value !== '';
}

export function isEmptyString(value: string): boolean{
    return value === undefined || value === '';
}

export function isEmptyArray(value: any[]): boolean{
    return value === null || value === undefined || value.length === 0;
}

export function isNotEmptyArray(value: any[]): boolean{
    return value !== null || value !== undefined || value.length > 0;
}