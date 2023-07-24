import {Injectable} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import {Observable, catchError, of, tap} from 'rxjs';
import {AppService} from '@services/app.service';
import {UserService} from '@services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private appService: AppService,
        private userService: UserService
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        //return this.getProfile();
        return this.userService.validateToken().pipe(
            tap((isAuthenticated) => {
                if (!isAuthenticated) {
                    this.router.navigateByUrl('/login');
                }
            }),
            catchError((error) => {
                console.log(error);
                return of(error);
            })
        );
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.canActivate(next, state);
    }

    // async getProfile() {
    //     if (this.appService.user) {
    //         return true;
    //     }

    //     try {
    //         await this.appService.getProfile();
    //         return true;
    //     } catch (error) {
    //         return false;
    //     }
    // }
}
