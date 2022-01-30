import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {

  user = { name: '', email: '', password: ''};
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<RegisterModalComponent>) { }

  ngOnInit(): void {
  }

  onConfirmClick() {
    this.dialogRef.close({user: this.user});
  }

  enableRegistration() {
    return this.user.name && this.user.email && this.user.password;
  }
}
