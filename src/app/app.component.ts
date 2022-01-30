import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { User } from './Model/User';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Application de gestion des assignments';
  isLogged: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private assignmentsService: AssignmentsService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    if( localStorage.getItem('currentUser')) {
      this.isLogged = true;
    }
    
  }

  login() {
    const dialogRef = this.dialog.open(LoginModalComponent,{
      data:{}
    });

    dialogRef.afterClosed().subscribe((data: {success: boolean}) => {
      if(data.success) {
        this.isLogged = data.success;
        this.authService.toggleLoggedIn();
      }
    });
  }

  logout() {
    this.isLogged = false;
    localStorage.removeItem('currentUser');
  }


  remplirBD() {
    //this.assignmentsService.peuplerBD();

    this.assignmentsService.peuplerBDAvecForkJoin().subscribe(() => {
      console.log('LA BASE EST ENTIEREMENT REMPLIE AVEC LES DONNEES DE TEST');

      // replaceUrl = true = force le refresh, même si
      // on est déjà sur la page d’accueil
      this.router.navigate(['/home'], { replaceUrl: true });
    });
  }

  register() {
    const dialogRef = this.dialog.open(RegisterModalComponent,{
      data:{}
    });

    dialogRef.afterClosed().subscribe((user: User) => {
      this.authService.register(user).subscribe();
    });
  }
}
