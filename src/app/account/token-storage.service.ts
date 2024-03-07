import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const IP_KEY = 'user-ip';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    constructor() { }

    public saveToken(token: string) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string {
        return sessionStorage.getItem(TOKEN_KEY);
    }

    public saveUser(user) {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    public saveIp(ip) {
        window.sessionStorage.removeItem(IP_KEY);
        window.sessionStorage.setItem(IP_KEY, JSON.stringify(ip));
    }

    public getUser() {
        return JSON.parse(sessionStorage.getItem(USER_KEY));
    }
    public getIp() {
        return JSON.parse(sessionStorage.getItem(IP_KEY));
    }
}