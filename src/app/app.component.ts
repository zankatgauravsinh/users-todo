import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { merge } from 'rxjs';
import { UserService } from './services/user.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'action'];
  dataSource:any;
  user:any;

  users: any[] = [];

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar:MatSnackBar
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers()
    .subscribe((users:any) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);
    });
  }

  addItem() {
    this.dataSource = new MatTableDataSource(this.users);
  }

  AddeditUser(user:any) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '250px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result -', result);
      if (result.action == 'add') {
        this.userService.setUser(result.data)
        .subscribe(res => {
          console.log('res >>>', res);
          this.getUsers();
          this.snackBar.open('User Created Successfully', undefined, { duration: 1000 });
        })
      } else {
        this.user = result.data;
        this.snackBar.open('User Updated Successfully', undefined, { duration: 1000 });
      }
    }, err => {
      this.snackBar.open(err, undefined, { duration: 1000 });
    });
  }

}