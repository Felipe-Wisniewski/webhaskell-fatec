import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserTestPage } from './user-test';

@NgModule({
  declarations: [
    UserTestPage,
  ],
  imports: [
    IonicPageModule.forChild(UserTestPage),
  ],
})
export class UserTestPageModule {}
