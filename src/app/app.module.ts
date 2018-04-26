import { BattlefieldService } from './battlefield.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastModule } from 'ng2-toastr';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GameActivityComponent } from './components/game-activity/game-activity.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameActivityComponent
  ],
  imports: [
    BrowserModule,
    ToastModule.forRoot()
  ],
  providers: [BattlefieldService],
  bootstrap: [AppComponent]
})
export class AppModule { }
