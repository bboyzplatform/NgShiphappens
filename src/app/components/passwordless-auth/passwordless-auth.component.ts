import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwordless-auth',
  templateUrl: './passwordless-auth.component.html',
  styleUrls: ['./passwordless-auth.component.scss']
})
export class PasswordlessAuthComponent implements OnInit {
  user: Observable<any>;
  email: string;
  emailSent = false;

  errorMessage: string;

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.user = this.afAuth.authState;

    const url = this.router.url;

    this.confirmSignIn(url);
  }
}
