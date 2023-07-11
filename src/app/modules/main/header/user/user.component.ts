import { ILookupCodeReturn } from '@/interfaces/lookup-code-return.interface';
import { Company } from '@/models/company.model';
import { User } from '@/models/user.model';
import { enumLookupCodeGroup } from '@/utils/lookupCodeGroups.enum';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AppService} from '@services/app.service';
import { CompanyService } from '@services/company.service';
import { FileUploadService } from '@services/file-upload.service';
import { LookupService } from '@services/lookup.service';
import { MailService } from '@services/mail.service';
import { RoleService } from '@services/role.service';
import { UserService } from '@services/user.service';
import {DateTime} from 'luxon';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public rolesString: string = '';  
    public lcItems: [ILookupCodeReturn];    
    public user: User;
    public company: Company;
    public uploadImage: File;
    public imgTemp: any = '';
    
    constructor(
        private appService: AppService, 
        private userService: UserService,
        private roleService: RoleService,
        private companyService: CompanyService,
        private lookupService: LookupService,
        private mailService: MailService,
        private router: Router,
        private fileUploadService: FileUploadService
        ) {
            this.user = userService.user;            
        }

    ngOnInit(): void {
        //this.user = this.appService.user;
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
    }

    

    logout() {
        this.appService.logout();
    }

    formatDate(date) {
        return DateTime.fromISO(date).toFormat('dd LLL yyyy');
    }
}
