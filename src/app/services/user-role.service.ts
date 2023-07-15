import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class UserRoleService {
    constructor(private http: HttpClient) {}

    getUserRoles(user: string) {
        return this.http.get(`${base_url}/userRoles/${user}`);
    }
}
