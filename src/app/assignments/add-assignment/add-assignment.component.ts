import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  // associées au champs input du formulaire
  nomDevoir = "";
  dateDeRendu!: Date;
  nomAuteur = "";
  nomMatiere = "";
  imageMatiere = "";
  photoProf = "";

  constructor(private assignmentService: AssignmentsService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddAssignmentComponent>) { }

  ngOnInit(): void {
  }
  auteur?: string;
  matiere?: {
    nomMatiere: string,
    imageMatiere: string,
    photoProf: string
  };
  note?: number;
  remarques?: string
  onSubmit() {
    console.log("NOM = " + this.nomDevoir);
    console.log("DATE = " + this.dateDeRendu);

    const newAssignment = new Assignment();
    newAssignment.id = Math.round(Math.random() * 100000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.auteur = this.nomAuteur;
    newAssignment.matiere = {
      nomMatiere: this.nomMatiere,
      imageMatiere: this.imageMatiere,
      photoProf: this.photoProf
    };

    this.assignmentService.addAssignment(newAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);

      });
  }


}
