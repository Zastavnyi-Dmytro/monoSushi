import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {
  public authForm!:FormGroup

  constructor(
    private fb:FormBuilder,
    private accountService:AccountService,
    private router: Router 
    ){}

  ngOnInit(): void {
    this.initAuthForm()
  }

  initAuthForm():void{
    this.authForm = this.fb.group({
      email:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required]]
    })
  }

  login(){
    this.accountService.login(this.authForm.value).subscribe(data=>{
        const user = data[0]
        localStorage.setItem('currentUser', JSON.stringify(user))
        this.accountService.isUserLogin$.next(true)
        if(user && user.role===ROLE.USER){
          this.router.navigate(['/user-profile'])
        }
        else if(user && user.role===ROLE.ADMIN){
          this.router.navigate(['/admin/discounts'])
        }
    },(err)=>{
      console.log(err)
    })
  }
}
