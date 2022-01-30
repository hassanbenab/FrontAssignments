import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<LoginModalComponent>,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  enableLogin() {
    return this.email && this.password;
  }

  onLoginClick() {
    this.authService.logIn(this.email, this.password).subscribe(response => {
      localStorage.setItem('currentUser', JSON.stringify({ token: response.token, email: response.email }));
      this.dialogRef.close({ success: true });
      this.toastr.success('Vous êtes connecté', 'Bienvenue !', {
        timeOut: 4000,
        positionClass: 'toast-top-center'
      });

    }, error => {
      this.toastr.error('Votre email ou mot de passe est incorrecte', '', {
        timeOut: 4000,
        positionClass: 'toast-top-center'
      });

    });
  }
}
