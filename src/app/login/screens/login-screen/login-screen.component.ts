import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  userNotExist = false;
  userRegistred = false;

  messageErrorSI: any = {
    SIEmail: {
      required: 'Obligatory field',
      email: 'Format example: email@email.com'
    },
    SIPassword: {
      required: 'Obligatory field',
      minlength: 'minimum 8 characters'
    }
  };

  messageErrorSU: any = {
    userName: {
      required: 'Obligatory field',
      minlength: 'minimum 8 characters',
      maxlength: 'maximum 25 characters'
    },
    lastName: {
      required: 'Obligatory field',
      minlength: 'minimum 8 characters',
      maxlength: 'maximum 25 characters'
    },
    emailAddress: {
      required: 'Obligatory field',
      email: 'Format example: email@email.com'
    },
    firstName: {
      required: 'Obligatory field',
      minlength: 'minimum 8 characters',
      maxlength: 'maximum 25 characters'
    },
    phoneNumber: {
      required: 'Obligatory field',
      minlength: 'Obligatory 10 numbers',
      maxlength: 'Obligatory 10 numbers'
    },
    password: {
      required: 'Obligatory field',
      minlength: 'minimum 8 characters'
    }
  };

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private readonly router: Router) {}

  ngOnInit(): void {
    this.usersService.getUsersByQuery()
      .subscribe(res => {
        this.ELEMENT_DATA = res;
        console.log(this.ELEMENT_DATA);
      });
    this.buildSingInForm();
    this.buildSingUpForm();
  }  

  getErrorSIForm(nameError: string): string {
    if (!this.SingInForm.get(nameError)?.touched) {
      return '';
    }
    const errors = this.SingInForm.get(nameError)?.errors || {};
    const error = Object.keys(errors)[0];
   
    return this.messageErrorSI[nameError][error];
  }

  getErrorSUForm(nameError: string): string {
    if (!this.SingUpForm.get(nameError)?.touched) {
      return '';
    }
    const errors = this.SingUpForm.get(nameError)?.errors || {};
    const error = Object.keys(errors)[0];

   
    return this.messageErrorSU[nameError][error];
  }

  buildSingInForm() {
    this.SingInForm = this.formBuilder.group({
      SIEmail:    ['', [Validators.required, Validators.email]],
      SIPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  } 

  buildSingUpForm() {
    this.SingUpForm = this.formBuilder.group({
      userName:     ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      lastName:     ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      firstName:    ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      phoneNumber:  ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password:     ['', [Validators.required, Validators.minLength(8)]]
    });
  } 

  goToHome(index: String = ''){
    this.router.navigate(
      ['home',index]
    );
  }

  showAceptModal() {
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  addSubmit(newUser: User) {
    console.log(newUser);
    this.usersService.addUser(newUser)
      .subscribe(
        newUser => {
          console.log(newUser)
          this.userRegistred = true;
        }
      )
    this.showAceptModal();    
  }

  onLogin() {
    console.log(this.SingInForm.value) ;
    const found = this.SingInForm.value ;
    const index = this.usersService.searchUserIndex(this.ELEMENT_DATA, found.SIEmail);
    if(index){
      // REQUERMENTO FALTANTE: this.confirmPassword(found.password);
      this.userNotExist=false;
      this.usersService.getUserByIndex(index)
      .subscribe(
        () => this.goToHome(index)
      );
    }else{
      this.userNotExist=true;
    }
  }

  onSingUp() {
    console.log(this.SingUpForm.value) ;
    const newUser = this.usersService.createUser(this.SingUpForm.value);
    this.addSubmit(newUser) ;
  }

  refreshPage(){
    location.reload();
  }
}