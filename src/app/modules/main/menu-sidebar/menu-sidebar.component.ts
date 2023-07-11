import {Component, HostBinding, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Observable} from 'rxjs';

// Models
import { User } from '@/models/user.model';
import { Company } from '@/models/company.model';

// Interfaces
import { ILookupCodeReturn } from '@/interfaces/lookup-code-return.interface';

// Utils
import { enumLookupCodeGroup } from '@/utils/lookupCodeGroups.enum';
import { DataHelper } from '@/utils/data-helper';

// Services
import {AppService} from '@services/app.service';
import { CompanyService } from '@services/company.service';
import { LookupService } from '@services/lookup.service';
import { RoleService } from '@services/role.service';
import { UserService } from '@services/user.service';
import { MenuService } from '@services/menu.service';


const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user: User;
    public menu: any[] = [];//MENU;

    public rolesString: string = ''; 
    public lcItems: [ILookupCodeReturn];
    public company: Company;
    public uploadImage: File;
    public imgTemp: any = '';

    constructor(
        private appService: AppService,
        private userService: UserService,
        private roleService: RoleService,
        private companyService: CompanyService,
        private lookupService: LookupService,
        private menuService: MenuService,
        private store: Store<AppState>
    ) {
        this.user = userService.user; 
        this.menu = menuService.menu;
    }

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        
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

        this.userService.getUserCompany()
        .subscribe((userCompanyData: any) => {      
            if (userCompanyData.ok) {
                this.companyService.getCompanyById(userCompanyData.userCompany.company)
                .subscribe( (companyData: any) => {
                if (companyData.ok)
                this.company = companyData.company;
                this.getRoles();    
                });
            }
        });
    };

    getRoles() {
        this.roleService.getRoles()
        .subscribe((rolesData:any) =>{
          if (rolesData.ok) {
            if (rolesData.roles.length > 0) {
              // Obtenemos los roles del usuario
              this.userService.getUserRoles()
              .subscribe((userRolesData: any) => {
                if (userRolesData.ok) {              
                  // Filtramos los roles que coinciden con el Id
                  let tempRoles = rolesData.roles.filter((el) => {
                    return userRolesData.roles.some((f) => {
                      return f === el._id
                    });
                  });
                  let arrayRoles = [];
                  tempRoles.forEach((element) => {
                    arrayRoles.push(element.roleName);          
                  });
                  this.rolesString = new DataHelper().convertArrayToChainString(arrayRoles);
                }
              });          
            }
          }            
        })
      };
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    {
        name: 'Blank',
        iconClasses: 'fas fa-file',
        path: ['/blank']
    },
    {
        name: 'Main Menu',
        iconClasses: 'fas fa-folder',        
        children: [
            {
                name: 'Sub Menu',
                iconClasses: 'far fa-address-book',
                path: ['/sub-menu-1']
            },
            {
                name: 'Blank',
                iconClasses: 'fas fa-file',
                path: ['/sub-menu-2']
            }
        ]
    }
];
