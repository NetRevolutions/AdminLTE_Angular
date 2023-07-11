import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnDestroy{
  public title: String;
  public titleSubs$: Subscription;

  constructor( private _router: Router) {
    this.titleSubs$ = this.getPathTitle()
                        .subscribe(({title}) => {      
                          this.title = title;
                        });
  }


  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();    
  }

  getPathTitle() {
    return this._router.events
    .pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map((event: ActivationEnd) => event.snapshot.data ),
    );
  }

  // hasToken() {
  //   return localStorage.getItem('token') ? true : false; 
  // }
}
