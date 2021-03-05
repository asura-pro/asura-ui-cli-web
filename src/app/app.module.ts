import { registerLocaleData } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import zh from '@angular/common/locales/zh'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home.component'
import { VncComponent } from './pages/vnc/vnc.component'

registerLocaleData(zh);

const COMPONENTS = [
  AppComponent,
  HomeComponent,
  VncComponent,
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
