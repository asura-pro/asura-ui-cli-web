import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './pages/home.component'
import { VncComponent } from './pages/vnc/vnc.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vnc', component: VncComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
