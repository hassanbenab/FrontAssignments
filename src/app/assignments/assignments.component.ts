import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  ajoutActive = false;
  assignments: MatTableDataSource<Assignment>;

  displayedColumns: string[] = [
    'dateDeRendu',
    'nom',
    'matiere',
    'auteur',
    'note',
    'remarques',
    'rendu',
    'actions',
  ];
  editMode: boolean[] = [];
  editdisabled = false;

  date: any;
  name: any;
  note: any;
  remarques: any;
  nomMatiere: any;
  nomAuteur: any;
  // pour la pagination
  page: number = 0;
  limit: number = 10;
  totalDocs: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private assignmentService: AssignmentsService,
    public dialog: MatDialog,
    private authService: AuthService,

  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.assignmentService
        .getAssignmentsPagine(this.page + 1, this.limit)
        .subscribe((data) => {
          // le tableau des assignments est maintenant ici....
          // this.page = data.page;
          this.assignments = new MatTableDataSource(data.docs);
          this.assignments.paginator = this.paginator;
          this.assignments.sort = this.sort;
          this.totalDocs = data.totalDocs;
        });
      for (var i = 0; i < this.totalDocs; i++) {
        this.editMode.push(false);
      }
    }, 1000);
  }

  getAssignments() {
    this.assignmentService
      .getAssignmentsPagine(this.page + 1, this.limit)
      .subscribe((data) => {
        this.assignments = new MatTableDataSource(data.docs);
        this.assignments.sort = this.sort;
        this.totalDocs = data.totalDocs;
      });
  }

  onPageChange($event: any) {
    console.log('event ', $event);
    this.page = $event.pageIndex;
    this.getAssignments();
  }

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  editRow(assignment: Assignment) {}

  updateEdit(assignment: Assignment, index: number) {
    if (this.name) {
      assignment.nom = this.name;
    }
    if (this.date) {
      assignment.dateDeRendu = this.date;
    }
    if (this.note) {
      assignment.note = this.note;
    }
    if (this.remarques) {
      assignment.remarques = this.remarques;
    }
    if (this.nomAuteur) {
      assignment.auteur = this.nomAuteur;
    }
    if (this.nomMatiere) {
      if (assignment.matiere) {
        assignment.matiere.nomMatiere = this.nomMatiere;
      } else {
        assignment.matiere = { nomMatiere: this.nomMatiere };
      }
    }

    this.assignmentService.updateAssignment(assignment).subscribe((reponse) => {
      console.log(reponse.message);
      this.editMode[index] = false;
      this.resetEdit();
      this.getAssignments();
    });
  }

  cancelEdit(index: number) {
    this.editMode[index] = false;
  }

  allowEdit(index: number) {
    for (var i = 0; i < this.totalDocs; i++) {
      if (i == index) {
        this.resetEdit();
        this.editMode[i] = true;
      } else {
        this.editMode[i] = false;
      }
    }
  }

  resetEdit() {
    this.date = undefined;
    this.name = undefined;
    this.note = undefined;
    this.remarques = undefined;
    this.nomAuteur = undefined;
    this.nomMatiere = undefined;
  }

  deleteRow(assignment: Assignment) {
    this.assignmentService.deleteAssignment(assignment).subscribe((reponse) => {
      console.log(reponse.message);
      this.getAssignments();
      // this.assignments = this.assignments.filter(a => a.id != assignment.id)
    });
  }

  onAssignmentRendu(assignment: Assignment, checked: any) {
    if (checked) {
      assignment.rendu = true;
      this.assignmentService
        .updateAssignment(assignment)
        .subscribe((reponse) => {
          console.log(reponse.message);
          this.getAssignments();
        });
    }
  }

  AddAssignment() {
    const dialogRef = this.dialog.open(AddAssignmentComponent, {
      data: {},
    });

    // dialogRef.afterClosed().subscribe((data: {success: boolean}) => {
    //   if(data.success) {
    //     this.isLogged = data.success;
    //     this.authService.toggleLoggedIn();
    //   }
    // });
  }

  assignmentDetails(id: number) {
    const dialogRef = this.dialog.open(AssignmentDetailComponent, {
      data: { id: id },
    });
  }
}
