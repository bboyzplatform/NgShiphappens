
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { simpleReducer } from './simple.reducer';
import { postReducer } from './reducers/post.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { GameMainFieldComponent } from './components/game-main-field/game-main-field.component';
import { PasswordlessAuthComponent } from './components/passwordless-auth/passwordless-auth.component';
import { AppRoutingModule } from './app-routing.module';
/* Firebased => */
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    GameMainFieldComponent,
    PasswordlessAuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      post: postReducer,
      message: simpleReducer
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    StoreDevtoolsModule.instrument({
      maxAge: 10 // number of states to retain
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
