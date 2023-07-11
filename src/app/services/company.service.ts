import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

// Interfaces
import { ICompanyRegister } from '@/interfaces/company-register.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor( private http: HttpClient ) { }

  getCompanyById (id: string ) {
    return this.http.get(`${ base_url }/companies/${ id }`);
  };

  getCompanyByRuc( ruc: string ) {
    return this.http.get(`${base_url}/companies/ruc/${ruc}`);
  };

  createCompany( formData: ICompanyRegister ) {
    return this.http.post(`${base_url}/companies`, formData);
  }
}
