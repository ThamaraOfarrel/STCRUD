import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';

/**
 * @title Input with error messages
 */

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {  
  public ELEMENT_DATA: User[] = [];
  SingInForm!: FormGroup;
  SingUpForm!: FormGroup;

  constructor(private readonly router: Router,private formBuilder: FormBuilder, private usersService: UsersService) {
    
  }

  ngOnInit(): void {
    this.buildSingInForm();
    this.usersService.getUsersByQuery()
      .subscribe(res => {
        this.ELEMENT_DATA = res;
        console.log(this.ELEMENT_DATA);
      });
  }  

  buildSingInForm() {
    this.SingInForm = this.formBuilder.group({
      SIEmail: ['', [Validators.required, Validators.email]],
      SIPassword: ['', Validators.required]
    });
  } 

  goToHome(index:String = '') {
      this.router.navigate(['home',index]);
  }

  onLogin() {
    const found = this.SingInForm.value ;
    const index = this.usersService.searchUserIndex(this.ELEMENT_DATA, found.SIEmail);
    if(index){
      this.goToHome(index);
    }else{
      console.log(false);
    }
  }
}