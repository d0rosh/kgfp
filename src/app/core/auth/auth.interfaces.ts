export interface User {
    email: string,
    password: string
}

export interface NewUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface CurrentUser {
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    _id: string,
    avatar: string,
    date: string
}