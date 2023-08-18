import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared-module';
import { UserProfileRoutingModule } from './user-profile-routing-module'
import { UserProfileInfoComponent } from './user-profile-info/user-profile-info.component'; 
import { UserProfileHistoryComponent } from './user-profile-history/user-profile-history.component'; 
import { UserProfileChangePasswordComponent } from './user-profile-change-password/user-profile-change-password.component';



@NgModule({
  declarations: [
    UserProfileInfoComponent,
    UserProfileHistoryComponent,
    UserProfileChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserProfileRoutingModule,
  ]
})
export class UserProfileModule { }
