import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { HttpClientModule } from '@angular/common/http';

import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { ToastrModule } from 'ngx-toastr';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSortModule } from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes:Routes = [
  {
    path:"",
    component: AssignmentsComponent,
    
  },
  {
    path:"home",
    component: AssignmentsComponent,
  },
  // {
  //   path:"add",
  //   component: AddAssignmentComponent
  // },
  // {
  //   path:"assignment/:id",
  //   component: AssignmentDetailComponent
  // },
  // {
  //   path:"assignment/:id/edit",
  //   component: EditAssignmentComponent,
  //   canActivate : [AuthGuard]
  // }
];
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    RegisterModalComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    FormsModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatListModule, MatCardModule,
    MatCheckboxModule, MatSlideToggleModule, HttpClientModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
