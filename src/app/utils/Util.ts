
export function isNotEmptyString(value: string): boolean{
    return value !== undefined && value !== '';
}

export function isEmptyString(value: string): boolean{
    return value === undefined || value === '';
}