import { Component, OnInit} from '@angular/core';
import { DateTime} from 'luxon';

// Utils
import { enumLookupCodeGroup } from '@/utils/lookupCodeGroups.enum';

// Interfaces
import { ILookupCodeReturn } from '@/interfaces/lookup-code-return.interface';

// Models
import { Company } from '@/models/company.model';
import { User } from '@/models/user.model';

// Services
import { LookupService } from '@services/lookup.service';
import { UserService } from '@services/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {      
    public lcItems: [ILookupCodeReturn];    
    public user: User;
    public company: Company;
    public uploadImage: File;
    public imgTemp: any = '';
    
    constructor(        
        private userService: UserService,        
        private lookupService: LookupService       
        ) {
            this.user = userService.user;            
        }

    ngOnInit(): void {        
        this.lookupService.getLookupCodesByLookupCodeGroupName(enumLookupCodeGroup.TIPO_EMPRESA)
        .then((results: [ILookupCodeReturn]) => {
            this.lcItems = results;

            this.lcItems.unshift({
                lcgId: '',
                lcgName: '',
                lcId: '',
                lcName: '-- Tipo de Empresa --',
                lcValue: '',
                lcOrder: 0
              });
        });
    };    

    logout() { this.userService.logout(); };

    formatDate( date: any ) { return DateTime.fromISO(date).toFormat('dd LLL yyyy'); }
}
