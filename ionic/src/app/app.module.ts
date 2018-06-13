import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ConfigurarPage } from '../pages/configurar/configurar';
import { FeedPage } from '../pages/feed/feed';
import { PublicarPage } from '../pages/publicar/publicar';
import { TabsPage } from '../pages/tabs/tabs';

import { ArtigosProvider } from '../providers/artigos/artigos';

import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    FeedPage,
    PublicarPage,
    ConfigurarPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FeedPage,
    PublicarPage,
    ConfigurarPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ArtigosProvider
  ]
})
export class AppModule {}
