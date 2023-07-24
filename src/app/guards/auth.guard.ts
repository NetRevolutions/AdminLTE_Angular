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
import {UserService} from '@services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private userService: UserService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.userService.validateToken().pipe(
            tap({
                next: (isAuthenticated) => {
                    if (!isAuthenticated) {
                        localStorage.removeItem('token');
                        this.router.navigateByUrl('/login');
                        return of(false);
                    }
                },
                error: (error) => {
                    console.log(error);
                    this.router.navigateByUrl('/login');
                    return of(error);
                },
                complete: () => {
                    console.log('validateToken complete');
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
}
