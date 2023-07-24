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
import {AppService} from '@services/app.service';
import {UserService} from '@services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    //public fb: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService,
        private userService: UserService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    // public loginForm = new UntypedFormGroup({
    //     email: new UntypedFormControl(null, Validators.required),
    //     password: new UntypedFormControl(null, Validators.required),
    //     remember: new UntypedFormControl(false)
    // });

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
            //await this.appService.loginByAuth(this.loginForm.value);
            this.userService
                .login({
                    email: this.loginForm.value['email'],
                    password: this.loginForm.value['password'],
                    remember: this.loginForm.value['remember']
                })
                .subscribe((resp) => {
                    if (this.loginForm.get('remember').value) {
                        localStorage.setItem(
                            'email',
                            this.loginForm.get('email').value
                        );
                    } else {
                        localStorage.removeItem('email');
                    }
                    this.isAuthLoading = false;
                    this.router.navigateByUrl('/');
                    this.toastr.success('Login success');
                });
        } else {
            this.toastr.error('Form is not valid!');
        }
    }

    // async loginByGoogle() {
    //     this.isGoogleLoading = true;
    //     await this.appService.loginByGoogle();
    //     this.isGoogleLoading = false;
    // }

    // async loginByFacebook() {
    //     this.isFacebookLoading = true;
    //     await this.appService.loginByFacebook();
    //     this.isFacebookLoading = false;
    // }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
