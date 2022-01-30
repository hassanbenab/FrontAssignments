import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment?:Assignment;
  // champs du formulaire
  nomAssignment?:string;
  dateDeRendu?:Date;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private assignmentService:AssignmentsService) { }

  ngOnInit(): void {
    // exemple de récupération de "query params" et "fragment"
    // exemple d'URL : /assignment/1/edit?nom=Buffa&prenom=Michel#edit
    console.log("QUERY PARAMS : ");
    console.log(this.route.snapshot.queryParams);
    console.log("FRAGMENT : ");
    console.log(this.route.snapshot.fragment);

    this.getAssignment();
  }

  getAssignment() {
    // récupère l'id dans l'URL
    const id = +this.route.snapshot.params['id'];

    this.assignmentService.getAssignment(id)
    .subscribe(assignment => {
      // Pour que la "vue" affiche les informations
      // de l'assignment qu'on édite....
      this.assignment = assignment;
      // pré-remplit le formulaire dès l'affichage
      this.nomAssignment = assignment?.nom;
      this.dateDeRendu = assignment?.dateDeRendu;
    })
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    if (this.nomAssignment) {
      this.assignment.nom = this.nomAssignment;
    }

    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }
    this.assignmentService
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });


  }
 }
