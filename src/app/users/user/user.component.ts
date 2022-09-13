import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {  // this is to load the id and name that is given in URL ex - users/1/Max
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    this.paramsSubscription =  this.route.params. // this will load the id and name if we change the URL within the same page ex - users/10/Anna 
      subscribe(   // this will subscribe to know if there is any change in id and name in url
        (params: Params) => {
          this.user.id = params['id'],
          this.user.name = params['name'];
        }
      );
  }

  ngOnDestroy(): void { // the subscription needs to be destroyed, but angular does it for us
      this.paramsSubscription.unsubscribe();
  }

}
