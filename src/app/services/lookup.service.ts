import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { enumLookupCodeGroup } from '@/utils/lookupCodeGroups.enum';
import { ILookupCodeReturn } from '@/interfaces/lookup-code-return.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor( private http: HttpClient) { }

  // Lookup Code Group - section
  getLookupCodeGroupsName() {
    return this.http.get(`${base_url}/lookupCodeGroups`);
  };
  
  // Lookup Code - section
  getLookupCodesByLCGID(lcgID: string) {
    return this.http.get(`${base_url}/lookupCodes/${lcgID}`);
  };

  getLookupCodesByLookupCodeGroupName(lcg: enumLookupCodeGroup) {
    return new Promise((resolve, reject) => {
      this.getLookupCodeGroupsName()
      .subscribe((lcgResult: any) => {
        if( !lcgResult.ok ) {
          reject( lcgResult.msg );
        }
        else {
          // Obtenemos el Id del LCG (TODO: Mejorar para que sea en una sola llamada)
          let lcgIDselected = lcgResult.lookupCodeGroups.find(({ lookupCodeGroupName }) => lookupCodeGroupName === lcg)._id
          let lcgNameselected = lcgResult.lookupCodeGroups.find(({ lookupCodeGroupName }) => lookupCodeGroupName === lcg).lookupCodeGroupName
          this.getLookupCodesByLCGID(lcgIDselected)
          .subscribe((lcResult: any) => {
            if ( !lcResult.ok ) {
              reject( lcResult.msg )
            }
            else {
              let results = [];
              if ( lcResult.lookupCodes.length > 0 ) {                
                lcResult.lookupCodes.forEach(element => {
                  let item = {} as ILookupCodeReturn;
                  item.lcgId = lcgIDselected;
                  item.lcgName = lcgNameselected;
                  item.lcId = element._id;
                  item.lcName = element.lookupCodeName;
                  item.lcValue = element.lookupCodeValue;
                  item.lcOrder = element.lookupCodeOrder;
                  results.push( item );
                });
                resolve( results );
              } 
              else {
                resolve( [] );
              }
            }
          });
        }
      })
    });
  };
  
}
