import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import 'rxjs/add/operator/publishReplay';

import { User } from '../model/user';
import { IUser } from './models/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    identity: User;
    identityPromise: Promise<User>;
    url = '';

    constructor(
        private http: HttpClient
    ) {

        this.url = environment.apiServer;

        if (localStorage.currentUser) {
            this.getIdentity().subscribe(user => {
                this.identity = user;
            },
                err => {
                    this.logout();
                    alert('Sesja wygasła, zaloguj się ponownie');
                    window.location.reload();
                });
        }
    }

    get options() {
        return { headers: new HttpHeaders({ Authorization: localStorage.currentUser }) };
    }

    getExperts(discipline: string) {
        return this.http.get<any>(`${this.url}/api/user/search/experts/${discipline}`, this.options).publishReplay(1).refCount();
    }

    getUsers() {
        return this.http.get<any>(`${this.url}/api/user/users`, this.options).publishReplay(1).refCount();
    }

    getUserById(id: string) {
        return this.http.get<any>(`${this.url}/api/user/users/${id}`, this.options).publishReplay(1).refCount();
    }

    createUser(user: IUser) {
        return this.http.post<any>(`${this.url}/api/user/users`, user, this.options).publishReplay(1).refCount();
    }

    updateUserById(id: string, user: IUser) {
        return this.http.put<any>(`${this.url}/api/user/users/${id}`, user, this.options).publishReplay(1).refCount();
    }

    getUsersByDiscipline(discipline: string) {
        return this.http.get<any>(`${this.url}/api/user/search/users/${discipline}`, this.options).publishReplay(1).refCount();
    }

    updateUser(user: User) {
        return this.http.patch<any>(`${this.url}/api/user/update`, user, this.options).publishReplay(1).refCount();
    }

    getNumberOfAssignedForms() {
        return this.http.get<any>(`${this.url}/api/user/numberOfAssignedForms`, this.options).publishReplay(1).refCount();
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.url}/api/user/login`, { email, password })
            .pipe(map(response => {
                if (response.user && response.token) {
                    localStorage.setItem('currentUser', JSON.stringify(response.token));
                    localStorage.setItem('identity', JSON.stringify(response.user));
                    this.identity = response.user;
                }
                return response;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('identity');
        window.location.reload();
    }

    forgot(email: string) {
        return this.http.post<any>(`${this.url}/api/user/forgot`, { email: email }).publishReplay(1).refCount();
    }

    reset(id: string, password: string, token: string) {
        return this.http.post<any>(`${this.url}/api/user/reset`, { id: id, password: password, token: token }).publishReplay(1).refCount();
    }

    getIdentity(): Observable<User> {
        if (localStorage.currentUser) {
            return this.http.get<User>(`${this.url}/api/user`, this.options).publishReplay(1).refCount();
        } else {
            return new EmptyObservable<User>();
        }
    }

    theIdentity() {
        if (localStorage.identity) {
            return JSON.parse(localStorage.identity);
        } else {
            return null;
        }
    }

    getToken(): string {
        return localStorage.getItem('currentUser');
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);

        if (decoded.exp === undefined) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if (!token) {
            token = this.getToken();
        }
        if (!token) {
            return true;
        }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) {
            return true;
        }
        return !(date.valueOf() > new Date().valueOf());
    }
}
