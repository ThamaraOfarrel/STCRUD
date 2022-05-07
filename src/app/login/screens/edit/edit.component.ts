import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  @Input() user!: User;
  @Output() changeEdStateHome = new EventEmitter<boolean>();

  EditForm!: FormGroup;
  editTitle = false;

  messageError: any = {
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
      minlength: 'minimum 8 characters',
    }
  };

  constructor(
    private readonly router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {    

    this.buildEditForm();
    if(this.user.userName){
      this.editTitle = true;
      this.EditForm.patchValue({ ...this.user });
      console.log(this.EditForm.value); 
    }
       
  }

  addSubmit() {
    const newUser = this.usersService.createUser(this.EditForm.value);
    this.usersService.addUser(newUser)
      .subscribe(
        newUser => {
          console.log(newUser)
          this.showAceptModal();  
        }
      )   
  }

  editSubmit() {
    if(this.user.userName){
      console.log('es ' + this.user.id);
      const cloneUser = this.usersService.cloneUser(
        this.user,
        this.EditForm.value
      );
      console.log(cloneUser);
      this.usersService.updateUser(cloneUser).subscribe((newUser) => {
        console.log(newUser);
        this.showAceptModal();
      });      
    }else{
      this.addSubmit();
    }
  }

  changeEditState() {
    this.changeEdStateHome.emit(false);
  }

  buildEditForm() {
    this.EditForm = this.formBuilder.group({
      userName:     ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      lastName:     ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      firstName:    ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      phoneNumber:  ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password:     ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  showAceptModal() {
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500,
    });
    location.reload();
  }

  showCancelModal() {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6666ff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'success');
      }
    });
  }

  getError(nameError: string): string {
    if (!this.EditForm.get(nameError)?.touched) {
      return '';
    }
    const errors = this.EditForm.get(nameError)?.errors || {};
    const error = Object.keys(errors)[0];

   
    return this.messageError[nameError][error];
  }
}
