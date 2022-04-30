import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent {
  id!: string;
  index!: string;
  public ELEMENT_DATA!: User ;

  tiles: Tile[] = [
    {text: 'One', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 2, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 2, rows: 2, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

	constructor(private readonly router: Router, private readonly route: ActivatedRoute, private usersService: UsersService) { }

	ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id']; // Este id hce referencia a d especificado en el routing module
        this.index = params['index']; // Este id hce referencia a d especificado en el routing module
      }
    ); 
    this.usersService.getUserByIndex(this.index)
      .subscribe(res => {
        this.ELEMENT_DATA = res;
        console.log(this.ELEMENT_DATA);
      });
  }  

  comeBackHome() {
    this.router.navigate(['home',this.id]);
  }

}