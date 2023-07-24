import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, catchError, map, of, tap} from 'rxjs';
import {environment} from 'environments/environment';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

// Models
import {User} from '@/models/user.model';

// Interface
import {IUserRegisterForm} from '@/interfaces/user-register-form.interface';
import {IUserProfileUpdate} from '@/interfaces/user-profile-update.interface';
import {IUserLoginForm} from '@/interfaces/user-login-form.interface';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public user: User;

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService
    ) {}

    get token(): string {
        return localStorage.getItem('token') || '';
    }

    get uid(): string {
        return this.user.uid || '';
    }

    get headers() {
        return {
            headers: {
                'x-token': this.token
            }
        };
    }

    validateToken(): Observable<boolean> {
        return this.http
            .get(`${base_url}/login/renew`, {
                headers: {'x-token': this.token}
            })
            .pipe(
                map((resp: any) => {
                    const {
                        email,
                        firstName,
                        imagePath = '',
                        lastName,
                        uid,
                        userName,
                        mobile = ' ',
                        createdUtc
                    } = resp.user;
                    this.user = new User(
                        firstName,
                        lastName,
                        email,
                        userName,
                        mobile,
                        '',
                        imagePath,
                        [],
                        uid,
                        createdUtc
                    );

                    localStorage.setItem('token', resp.token);
                    return true;
                }),
                catchError((error) => of(false))
            );
    }

    createUser(formData: IUserRegisterForm) {
        return this.http.post(`${base_url}/users`, formData);
    }

    createUserCompany(user: string, company: string) {
        return this.http.post(`${base_url}/userCompany`, {user, company});
        // Nota: En este medoto el token lo estoy seteando en el localstorage en los metodos mas arriba porque hacen otras tareas.
    }

    updateUserProfile(formData: IUserProfileUpdate) {
        return this.http.put(`${base_url}/users/${this.uid}`, formData, {
            headers: {
                'x-token': this.token
            }
        });
    }

    login(formData: IUserLoginForm) {
        return this.http.post(`${base_url}/login`, formData).pipe(
            tap((resp: any) => {
                localStorage.setItem('token', resp.token);
            })
        );
    }

    logout() {
        this.user = null;
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    getUserCompany() {
        return this.http.get(`${base_url}/userCompany/${this.uid}`);
    }

    getUserRoles() {
        return this.http.get(`${base_url}/userRoles/${this.uid}`);
    }

    getUsers(from: number = 0) {
        // http://localhost:3000/api/users?from=0
        const url = `${base_url}/users?from=${from}`;
        return this.http.get(url, this.headers).pipe(
            map((resp: any) => {
                const users = resp.users.map(
                    (user) =>
                        new User(
                            user.firstName,
                            user.lastName,
                            user.email,
                            user.userName,
                            user.mobile,
                            '',
                            user.imagePath,
                            user.roles,
                            user.uid,
                            user.createdUtc
                        )
                );
                return {
                    ok: resp.ok,
                    users,
                    total: resp.total,
                    uid: resp.uid
                };
            })
        );
    }
}
