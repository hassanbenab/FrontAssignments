import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?:Assignment;

  constructor(private assignmentService:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router,
              private authService:AuthService,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<AssignmentDetailComponent>) { }

  ngOnInit(): void {
    console.log("DANS COMPOSANT DETAIL")
    this.getAssignment();
  }

  getAssignment() {
    // on récupère l'id dans l'URL
    // le + force la conversion de string à number
    const id:number = this.data.id;
    console.log("ID = " + id);

    this.assignmentService.getAssignment(id)
    .subscribe(assignment => {
      // on utilise this.assignmentTransmis puisque c'est la propriété
      // utilisée dans le template HTML
      this.assignmentTransmis = assignment;
    })

  }

  isAdmin() {
    return this.authService.loggedIn;
  }
}
