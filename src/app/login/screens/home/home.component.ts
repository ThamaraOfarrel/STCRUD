import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public ELEMENT_DATA: User[] = [];
  edituser !: User;
  editState:Boolean = false;

  displayedColumns: string[] = ['select', 'name', 'number', 'email', 'sDate', 'card', 'edit', 'delete'];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
  selection = new SelectionModel<User>(true, []);
  
  id!: string;
  
  constructor(private readonly router: Router, private readonly route: ActivatedRoute,private usersService: UsersService) {
      
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log('SnapShot', this.route.snapshot.params);

    this.usersService.getUsersByQuery()
      .subscribe(res => {
        this.ELEMENT_DATA = res;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
        console.log(this.dataSource.data);
      });    
  }  

  sendPersonal(user: User) {
    this.router.navigate(
      ['personal',this.id],
      {queryParams: {id: user.id, userName: user.userName, lastName: user.lastName, firstName:user.firstName, phoneNumber: user.phoneNumber, emailAddress: user.emailAddress } }
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  changeEditState(bool: boolean){
    this.editState = bool;
  }

  goToAdd(){
    this.edituser = {
      userName:       '',
      lastName:       '',
      firstName:      '',
      phoneNumber:    '',
      emailAddress:   '',
      password:       ''
    };  
    this.editState = true;
  }

  showEdit(user: User) {    
    this.edituser = user;  
    this.editState = true;    
  }

  getOut() {
    this.router.navigate(['login']);
  } 

  getUsers(){
    this.usersService.getUsersByQuery()
    .subscribe( 
      res =>{
        console.log(this.dataSource);
      }
    );
  }
  
  showDeleteModal(id: String = ''){ 
    
    
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        }
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Do you want to delete the user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5E33FF',
        confirmButtonText: 'Acept',
        cancelButtonColor: '#FF3333',
        cancelButtonText: 'Cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          // -1- Delete 
    
          console.log('Delete: ',id, this.usersService.deleteUser(id));
          this.usersService.deleteUser(id).subscribe(
            res => {
              console.log(res);
            });

          // -0- Delete

          
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          location.reload(); 
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled'
          )
        }
      })
          



    }

  

}






    

