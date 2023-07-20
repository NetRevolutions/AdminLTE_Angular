import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

// Services
import {ToastrService} from 'ngx-toastr';
import {UserService} from '@services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private userService: UserService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    public loginForm = this.fb.group({
        email: [
            localStorage.getItem('email') || '',
            [Validators.required, Validators.email]
        ],
        password: ['', [Validators.required]],
        remember: [false]
    });

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }

    async loginByAuth() {
        if (this.loginForm.valid) {
            this.isAuthLoading = true;
            this.userService
                .login({
                    email: this.loginForm.value['email'],
                    password: this.loginForm.value['password'],
                    remember: this.loginForm.value['remember']
                })
                .subscribe({
                    next: (resp) => {
                        if (this.loginForm.get('remember').value) {
                            localStorage.setItem(
                                'email',
                                this.loginForm.get('email').value
                            );
                        } else {
                            localStorage.removeItem('email');
                        }

                        this.isAuthLoading = false;
                        this.toastr.success('Login success');
                        this.router.navigateByUrl('/');
                    },
                    error: (err) => {
                        //console.log('error', err);
                        this.toastr.error(err.error.msg);
                        this.isAuthLoading = false;
                    },
                    complete: () => {
                        console.info('inicio de sesion');
                    }
                });
            // .subscribe(
            //     (resp) => {
            //         if (this.loginForm.get('remember').value) {
            //             localStorage.setItem(
            //                 'email',
            //                 this.loginForm.get('email').value
            //             );
            //         } else {
            //             localStorage.removeItem('email');
            //         }
            //         this.isAuthLoading = false;
            //         this.router.navigateByUrl('/');
            //         this.toastr.success('Login success');
            //     },
            //     (err) => {
            //         console.log('error', err);
            //         this.toastr.error('Se produjo un error en el login');
            //     }
            // );
        } else {
            this.toastr.error('Form is not valid!');
        }
    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
