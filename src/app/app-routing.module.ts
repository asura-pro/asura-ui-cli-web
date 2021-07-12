import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './pages/home.component'
import { VncComponent } from './pages/vnc/vnc.component'
import { WebComponent } from './pages/web/web.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vnc', component: VncComponent },
  { path: 'web/:id', component: WebComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
