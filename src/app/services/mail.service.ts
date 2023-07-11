import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

// Interfaces
import { IUserRegisterForm } from '@/interfaces/user-register-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor( private http: HttpClient ) { }

  registerUser( formData: IUserRegisterForm ) {
    return this.http.post(`${ base_url }/mail/registerUser`, formData);
  }
}
