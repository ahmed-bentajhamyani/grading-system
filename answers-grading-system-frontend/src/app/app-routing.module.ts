import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { GradesComponent } from './components/grades/grades.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "test", component: QuestionsComponent },
  { path: "grade", component: GradesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
