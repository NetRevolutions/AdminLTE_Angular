import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updatePhoto(
    file: File, 
    type: 'users'|'drivers'|'complements'|'vehicles',
    id: string
  ) {     
    try {
      const url = `${ base_url}/upload/${ type }/${ id }`;
      const formData = new FormData();
      formData.append('img', file);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      if (data.ok) {
        return data.fileName;
      } else {
        return false;
      }      

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
