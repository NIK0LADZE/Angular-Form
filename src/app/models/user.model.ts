export interface User {
    updateId: number,
    comingFromUpdate?: boolean,
    email: string,
    password: string,
    confirmPassword: string,
    nickname: string,
    phone: string,
    website: string
}