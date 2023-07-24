import {enumSearchModels} from '@/utils/searchModels.enum';
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

    search(type: enumSearchModels, term: string) {
        const url = `${base_url}/${type}/${term}`;
        return this.http
            .get(url, this.headers)
            .pipe(map((resp: any) => resp.result));
    }
}
