import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public users: Array<Object> = [];

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role'];

  constructor(private admin: AdminService) { }

  ngOnInit() {
    this.admin.getUsers()
      .subscribe(
        res=>{
          this.users = res;
        },
        err=>console.log(err)
      )
  }

}
