import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BuildsService {
    apiUrl = environment.apiUrl;

    constructor(private $http: HttpClient) {
    }

    getAll(): Observable<any> {
        return this.$http.get(`${this.apiUrl}/bitbucket`);
    }
}
