/*
data structure of count-down event
*/

export interface date {
    year: number,
    month: number,
    day: number,
    date: string
}

export interface eventInfo {
    eventName: string,
    eventDate: date,
    eventComment: string,
    eventCatalogue: string,
    remindDay: number
}

export interface cataloguetList {
    catalogueName: string,
    catalogueTheme: string,
    itemLength: number,
    eventItem: any[]
}

export interface eventProfileList {
    catalogueItem: cataloguetList[]
}

export enum MonthStr {
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'Octorber',
    'November',
    'December'
}

export enum DateStr {
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
}