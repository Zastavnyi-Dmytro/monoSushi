import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/shared/guards/auth/auth.guard';
import { UserProfileChangePasswordComponent } from './user-profile-change-password/user-profile-change-password.component';
import { UserProfileHistoryComponent } from './user-profile-history/user-profile-history.component';
import { UserProfileInfoComponent } from './user-profile-info/user-profile-info.component';


const routes: Routes = [
    {path:'info', component: UserProfileInfoComponent, canActivate:[authGuard]},
    {path:'history', component: UserProfileHistoryComponent, canActivate:[authGuard]},
    {path:'change-password', component: UserProfileChangePasswordComponent, canActivate:[authGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserProfileRoutingModule { }
