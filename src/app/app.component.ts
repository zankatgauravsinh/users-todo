import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { merge } from 'rxjs';
import { UserService } from './services/user.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  displayedColumns: string[] = ['name', 'email', 'phone', 'address'];
  dataSource:any;
  user:any;

  users: any[] = [];

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users:any) => {
        this.users = users;
        console.log('--', users);
        
        this.dataSource = new MatTableDataSource(users);
      });
  }

}