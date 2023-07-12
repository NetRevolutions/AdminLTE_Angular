import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

// Interfaces
import { ILookupCodeReturn } from '@/interfaces/lookup-code-return.interface';

// Models
import { Company } from '@/models/company.model';
import { User } from '@/models/user.model';

// Utils
import { enumLookupCodeGroup } from '@/utils/lookupCodeGroups.enum';
import { DataHelper } from '@/utils/data-helper';

// Services
import { UserService } from '@services/user.service';
import { RoleService } from '@services/role.service';
import { CompanyService } from '@services/company.service';
import { LookupService } from '@services/lookup.service';
import { FileUploadService } from '@services/file-upload.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

    public rolesString: string = '';
    public lcItems: [ILookupCodeReturn];
    public profileForm: FormGroup;
    public user: User;
    public company: Company;
    public uploadImage: File;
    public imgTemp: any = '';
    public formSubmitted = false;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private roleService: RoleService,
        private companyService: CompanyService,
        private lookupService: LookupService,
        private fileUploadService: FileUploadService,
        private toastr: ToastrService        
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

        this.profileForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required]],
            userName: ['', [Validators.required]],
            mobile: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],          
            companyRuc: ['', [Validators.required]],
            companyComercialName: ['', [Validators.required]],
            companyEmail: ['', [Validators.required]],
            companyPhone: ['', [Validators.required]],
            companyType: ['', [Validators.required]]
        });

        this.userService.getUserCompany()
        .subscribe((userCompanyData: any) => {      
            if (userCompanyData.ok) {            
                this.companyService.getCompanyById(userCompanyData.userCompany.company)
                .subscribe( (companyData: any) => {
                if (companyData.ok)
                this.company = companyData.company;
                this.setValues();
                this.getRoles();
                //this.disableControls();    
                });
            }
        });
    };

    updateProfile() {
        this.formSubmitted = true;
        if ( this.profileForm.invalid ) { return; }

        // if ( this.profileForm.pristine) { return; }
        
        //console.log(this.profileForm.value);
        // return; // <== used for tests

        this.userService.updateUserProfile( this.profileForm.value )
        .subscribe({
            next: (usr: any) => {
                this.formSubmitted = false;
                if (usr.ok) { this.toastr.success('Los datos del usuario fueron actualizados correctamente'); }
                else { this.toastr.error('ocurrio un problema al actualizar los datos, contacte al administrador'); }
            },
            error: (err) => {
                this.formSubmitted = false;
                this.toastr.error( err.error.msg );
            },
            complete: () => {
                console.info('update profile complete');
            }
        });        
    };

    setValues() {
        // User
        this.user ? this.profileForm.controls['firstName'].setValue(this.user.firstName) : this.profileForm.controls['firstName'].setValue('');
        this.user ? this.profileForm.controls['lastName'].setValue(this.user.lastName) : this.profileForm.controls['lastName'].setValue('');
        this.user ? this.profileForm.controls['userName'].setValue(this.user.userName) : this.profileForm.controls['userName'].setValue('');
        this.user ? this.profileForm.controls['mobile'].setValue(this.user.mobile) : this.profileForm.controls['mobile'].setValue('');
        this.user ? this.profileForm.controls['email'].setValue(this.user.email) : this.profileForm.controls['email'].setValue('');
    
        // Company
        this.company ? this.profileForm.controls['companyRuc'].setValue(this.company.ruc) : this.profileForm.controls['companyRuc'].setValue('');
        this.company ? this.profileForm.controls['companyComercialName'].setValue(this.company.nombreComercial) : this.profileForm.controls['companyComercialName'].setValue('');
        this.company ? this.profileForm.controls['companyEmail'].setValue(this.company.companyEmail) : this.profileForm.controls['companyEmail'].setValue('');
        this.company ? this.profileForm.controls['companyPhone'].setValue(this.company.companyPhone) : this.profileForm.controls['companyPhone'].setValue('');
        this.company ? this.profileForm.controls['companyType'].setValue(this.company.typeOfCompany) : this.profileForm.controls['companyType'].setValue('');
    };

    getRoles() {
        this.roleService.getRoles()
        .subscribe({
            next: ( rolesData: any ) => {
                if ( rolesData.ok && rolesData.roles.length > 0) { 
                    // Obtenemos los roles del usuario
                    this.userService.getUserRoles()
                    .subscribe({
                        next: ( userRolesData: any ) => {
                            if ( userRolesData.ok ) {
                                // Filtramos los roles que coinciden con el Id
                                let rolesTemp = rolesData.roles.filter((el) => {
                                    return userRolesData.roles.some((f) => {
                                        return f === el._id;
                                    });
                                });
                                let arrayRoles = [];
                                rolesTemp.forEach((e) => {
                                    arrayRoles.push(e.roleName);
                                });
                                this.rolesString = new DataHelper().convertArrayToChainString(arrayRoles);
                            }
                        },
                        error: (err) => {
                            this.toastr.error( 'Se produjo un error al traer los roles del usuario' );
                            console.error(err.error.msg);
                        }
                    });                    
                }
            },
            error: (err) => {
                this.toastr.error( 'Se produjo un error al traer los roles' );
                console.error(err.error.msg);
            }
        });
    };

    // disableControls() {
    //     this.profileForm.controls['companyType'].disable();
    // };

    fieldNoValidate(field: string): boolean {
        if ( this.profileForm.get( field ).invalid && this.formSubmitted ) {
          return true; // Campo no es valido.
        } else {
          return false;
        }
    };

    changeImage( file: File ) {
        this.uploadImage = file;    
        if( !file ) { return this.imgTemp = null; }
    
        const reader = new FileReader();
        reader.readAsDataURL( file );
    
        reader.onloadend = () => {
          this.imgTemp = reader.result;
        }
    };

    loadImage() {
        this.fileUploadService
        .updatePhoto(this.uploadImage, 'users', this.user.uid)
        .then( img => {
            this.user.imagePath = img;
            this.toastr.success('Imagen actualizada con exito!');
        })
        .catch( err => {
            console.error(err);
            this.toastr.error('No se pudo subir la imagen');
        });
    };
}
