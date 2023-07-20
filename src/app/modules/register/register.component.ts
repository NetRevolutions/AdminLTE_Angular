import {ICompanyRegister} from '@/interfaces/company-register.interface';
import {ILookupCodeReturn} from '@/interfaces/lookup-code-return.interface';
import {enumLookupCodeGroup} from '@/utils/lookupCodeGroups.enum';
import {
    Component,
    OnInit,
    Renderer2,
    OnDestroy,
    HostBinding
} from '@angular/core';
import {
    UntypedFormGroup,
    UntypedFormControl,
    Validators,
    FormBuilder,
    FormGroup
} from '@angular/forms';
import {Router} from '@angular/router';
import {AppService} from '@services/app.service';
import {CompanyService} from '@services/company.service';
import {LookupService} from '@services/lookup.service';
import {MailService} from '@services/mail.service';
import {UserService} from '@services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'register-box2';
    public formSubmitted = false;
    public lcItems: [ILookupCodeReturn];

    public registerForm = this.fb.group(
        {
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required]],
            userName: ['', [Validators.required]],
            mobile: [''],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            password2: ['', [Validators.required]],
            companyRuc: ['', [Validators.required]],
            companyComercialName: ['', [Validators.required]],
            companyEmail: ['', [Validators.required]],
            companyPhone: ['', [Validators.required]],
            companyType: ['', [Validators.required]],
            terms: [false, [Validators.required]]
        },
        {
            validators: this.passwordsEquals('password', 'password2')
        }
    );

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private companyService: CompanyService,
        private lookupService: LookupService,
        private mailService: MailService,
        private router: Router,
        private renderer: Renderer2,
        private toastr: ToastrService
    ) {}

    ngOnDestroy(): void {
        // this.renderer.removeClass(
        //     document.querySelector('app-root'),
        //     'register-page'
        // );
    }

    ngOnInit() {
        this.lookupService
            .getLookupCodesByLookupCodeGroupName(
                enumLookupCodeGroup.TIPO_EMPRESA
            )
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

    createUser() {
        this.formSubmitted = true;
        //console.log(this.registerForm.value );

        if (this.registerForm.invalid) {
            return;
        }

        //return; // <== used for tests

        // Realizar el posteo

        this.userService.createUser(this.registerForm.value).subscribe({
            next: (usr: any) => {
                // Registrar empresa
                let companyEntity = {} as ICompanyRegister;
                companyEntity.ruc = this.registerForm.value['companyRuc'];
                companyEntity.nombreComercial =
                    this.registerForm.value['companyComercialName'];
                companyEntity.companyEmail =
                    this.registerForm.value['companyEmail'];
                companyEntity.companyPhone =
                    this.registerForm.value['companyPhone'];
                companyEntity.typeOfCompany_id =
                    this.registerForm.value['companyType'];

                this.companyService
                    .getCompanyByRuc(companyEntity.ruc)
                    .subscribe({
                        next: (comp: any) => {
                            if (!comp.ok) {
                                // Register company
                                this.companyService
                                    .createCompany(companyEntity)
                                    .subscribe({
                                        next: (comp2: any) => {
                                            // Register UserCompany
                                            this.userService
                                                .createUserCompany(
                                                    usr.user.uid,
                                                    comp2.company._id
                                                )
                                                .subscribe({
                                                    next: (usrComp: any) => {
                                                        this.formSubmitted =
                                                            false;
                                                        // Seteo de token
                                                        localStorage.setItem(
                                                            'token',
                                                            usr.token
                                                        );

                                                        // Envio de correo
                                                        this.mailService
                                                            .registerUser(
                                                                this
                                                                    .registerForm
                                                                    .value
                                                            )
                                                            .subscribe({
                                                                next: (
                                                                    resp: any
                                                                ) => {
                                                                    if (
                                                                        resp.ok
                                                                    ) {
                                                                        this.toastr.success(
                                                                            resp.msg
                                                                        );
                                                                        this.router.navigateByUrl(
                                                                            '/sign-in'
                                                                        );
                                                                    } else {
                                                                        this.toastr.error(
                                                                            'ocurrio un problema durante el envio de correo, contacte al administrador'
                                                                        );
                                                                    }
                                                                },
                                                                error: (
                                                                    err
                                                                ) => {
                                                                    this.toastr.error(
                                                                        err
                                                                            .error
                                                                            .msg
                                                                    );
                                                                },
                                                                complete:
                                                                    () => {
                                                                        console.info(
                                                                            'send mail of register user complete'
                                                                        );
                                                                    }
                                                            });
                                                    },
                                                    error: (err) => {
                                                        this.toastr.error(
                                                            err.error.msg
                                                        );
                                                    },
                                                    complete: () => {
                                                        console.info(
                                                            'create user company complete'
                                                        );
                                                    }
                                                });
                                        },
                                        error: (err) => {
                                            this.toastr.error(err.error.msg);
                                        },
                                        complete: () => {
                                            console.info(
                                                'create company complete'
                                            );
                                        }
                                    });
                            }
                        },
                        error: (err) => {
                            this.toastr.error(err.error.msg);
                        },
                        complete: () => {
                            console.info('get company by ruc complete');
                        }
                    });
            },
            error: (err) => {
                this.toastr.error(err.error.msg);
            },
            complete: () => {
                console.info('create user complete');
            }
        });
    }

    fieldNoValidate(field: string): boolean {
        if (this.registerForm.get(field).invalid && this.formSubmitted) {
            return true; // Campo no es valido.
        } else {
            return false;
        }
    }

    passwordsNotValid() {
        const pass1 = this.registerForm.get('password').value;
        const pass2 = this.registerForm.get('password2').value;

        if (pass1 !== pass2 && this.formSubmitted) {
            return true;
        } else {
            return false;
        }
    }

    accepTerms() {
        return !this.registerForm.get('terms').value && this.formSubmitted;
    }

    passwordsEquals(pass1Name: string, pass2Name: string) {
        return (formGroup: FormGroup) => {
            const pass1Control = formGroup.get(pass1Name);
            const pass2Control = formGroup.get(pass2Name);

            if (pass1Control.value === pass2Control.value) {
                pass2Control.setErrors(null);
            } else {
                pass2Control.setErrors({noEqual: true});
            }
        };
    }
}
