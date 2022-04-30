import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';
import { EditComponent } from '../edit/edit.component';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public ELEMENT_DATA: User[] = [];
  displayedColumns: string[] = ['select', 'name', 'number', 'email', 'sDate', 'card', 'edit', 'delete'];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
  selection = new SelectionModel<User>(true, []);
  id!: string;
  //datos!: Object;

  constructor(private readonly router: Router, private readonly route: ActivatedRoute,private dialog: MatDialog, private http: HttpClient, private usersService: UsersService) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id']; // Este id hce referencia a d especificado en el routing module
      }
    ); 
    //this.usersService.getUsersByQuery('users');
    //this.getUsers();
    this.usersService.getUsersByQuery()
      .subscribe(res => {
        this.ELEMENT_DATA = res;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
        console.log(this.dataSource.data);
      });
  }  

  sendPersonal(index: String = '') {
    console.log(this.id)
    console.log(index)
    this.router.navigate(['personal',this.id,index]);
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

  showDeleteModal(){
    
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
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled'
        )
      }
    })

  }

  showEditModal(){
    this.dialog.open(EditComponent);
  }

  getOut() {
    this.router.navigate(['login']);
  } 

  getUsers(){
    this.usersService.getUsersByQuery('users')
    .subscribe( 
      res =>{
        //this.dataSource=res;
        console.log(this.dataSource);
      }
    );
  }

}
