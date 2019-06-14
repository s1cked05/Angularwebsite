import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomDialogsModule } from './modules/common/custom-dialogs/custom-dialogs.module';

import { NgBusyModule } from 'ng-busy';

import { AppGuard } from './app.guard';
import { AdminGuardService } from './admin-guard.service';
import { ExpertGuardService } from './expert-guard.service';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserFormsComponent } from './user-forms/user-forms.component';
import { ExpertRatingComponent } from './expert-rating/expert-rating.component';
import { NewSurveysComponent } from './new-surveys/new-surveys.component';
import { RatedSurveysComponent } from './rated-surveys/rated-surveys.component';
import { ExpertComponent } from './expert/expert.component';
import { ExpertSurveysComponent } from './expert-surveys/expert-surveys.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import {
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,
    MatIconModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, MatMenuModule, MatSidenavModule,
    MatListModule, MatToolbarModule, MatExpansionModule, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule
} from '@angular/material';
import { AssignUsersToFormsComponent } from './assign-users-to-forms/assign-users-to-forms.component';
import { UserAssignedFormsComponent } from './user-assigned-forms/user-assigned-forms.component';
import { LayoutModule } from './modules/common/layout/layout.module';
import { UserEditDialogComponent } from './modules/common/custom-dialogs/components/user-edit-dialog/user-edit-dialog.component';
import { CustomFormsModule } from './modules/common/custom-forms/custom-forms.module';
import { CustomControlsModule } from './modules/common/custom-controls/custom-controls.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AdminComponent,
        UserHomeComponent,
        UserFormComponent,
        UserFormsComponent,
        ExpertRatingComponent,
        NewSurveysComponent,
        RatedSurveysComponent,
        ExpertComponent,
        ExpertSurveysComponent,
        AdminUsersComponent,
        AssignUsersToFormsComponent,
        UserAssignedFormsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatCardModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatSelectModule,
        MatListModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatExpansionModule,
        MatButtonModule,
        MatMenuModule,
        MatDialogModule,
        CommonModule,
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false }
        ),
        NgBusyModule,
        LayoutModule,
        CustomDialogsModule,
        CustomFormsModule,
        CustomControlsModule,
        LayoutModule
    ],
    providers: [
        AppGuard,
        AdminGuardService,
        MatDatepickerModule,
        MatNativeDateModule,
        ExpertGuardService,
        // { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { ...MAT_DIALOG_DEFAULT_OPTIONS } }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
