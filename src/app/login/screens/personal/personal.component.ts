import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tile } from '../../interfaces/tile';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent {

  public ELEMENT_DATA!: User ;
  
  tiles: Tile[] = [
    {text: 'One', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 2, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 2, rows: 2, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'}
  ];

	constructor(private router: ActivatedRoute ) { }

	ngOnInit(): void {
      this.ELEMENT_DATA = JSON.parse(
        JSON.stringify(
          this.router.snapshot.queryParams
      ));
      console.log('SnapShot', this.router.snapshot.params);
      console.log('SnapShot', this.router.snapshot.queryParams);
      console.log(this.ELEMENT_DATA);
  }  

  comeBackHome() {}

}