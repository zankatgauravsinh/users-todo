import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { merge } from 'rxjs';
import { UserService } from './services/user.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'action'];
  dataSource:any;
  user:any;


  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar:MatSnackBar,
    private LangService: TranslocoService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers()
    .subscribe((users:any) => {
      // If Local server
      // this.dataSource = new MatTableDataSource(users.data); 

      // If Public API
      this.dataSource = new MatTableDataSource(users);
    });
  }

  AddeditUser(user:any) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '250px',
      data: user
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('result -', result);
      if (result.action == 'add') {
        this.userService.setUser(result.data)
        .subscribe((res:any) => {
          if(res.status ==1) {
            console.log('res >>>', res);
            this.getUsers();
            this.snackBar.open('User Created Successfully', undefined, { duration: 1000 });
          } else {

            this.snackBar.open(res, undefined, { duration: 2000 });
          }
        })
      } else {
        this.user = result.data;
        this.snackBar.open('User Updated Successfully', undefined, { duration: 1000 });
      }
    }, err => {
      this.snackBar.open(err, undefined, { duration: 1000 });
    });
  }
  changeLang(lang: any) {
    console.log('laneg, lang', lang)
    this.LangService.setActiveLang(lang.value);
  }
}