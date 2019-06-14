import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditPageComponent } from './user-edit-page.component';

const routes: Routes = [
    {
        path: '',
        component: UserEditPageComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserEditPageRoutingModule { }
