import {User} from '@/models/user.model';
import {enumModel} from '@/utils/models.enum';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {map} from 'rxjs';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class SearchesService {
    constructor(private http: HttpClient) {}

    get token(): string {
        return localStorage.getItem('token') || '';
    }

    get headers() {
        return {
            headers: {
                'x-token': this.token
            }
        };
    }

    private transformUsers(results: any[]): User[] {
        return results.map(
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
    }

    search(type: enumModel, term: string = '') {
        const url = `${base_url}/search/collection/${type}/${term}`;
        return this.http.get<any[]>(url, this.headers).pipe(
            map((resp: any) => {
                switch (type) {
                    case 'user':
                        return this.transformUsers(resp.result);
                        // TODO: Hacer lo mismo para las otras collecciones.
                        break;

                    default:
                        return [];
                        break;
                }
            })
        );
    }
}
