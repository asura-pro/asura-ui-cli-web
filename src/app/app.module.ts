import { registerLocaleData } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import zh from '@angular/common/locales/zh'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { IconDefinition } from '@ant-design/icons-angular'
import { ReloadOutline } from '@ant-design/icons-angular/icons'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzEmptyModule } from 'ng-zorro-antd/empty'
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzTagModule } from 'ng-zorro-antd/tag'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home.component'
import { VncComponent } from './pages/vnc/vnc.component'
import { WebComponent } from './pages/web/web.component'

registerLocaleData(zh);

const icons: IconDefinition[] = [
  ReloadOutline,
]

const NzModules = [
  NzIconModule.forRoot(icons),
  NzDropDownModule,
  NzSelectModule,
  NzEmptyModule,
  NzTagModule,
]

const COMPONENTS = [
  AppComponent,
  HomeComponent,
  VncComponent,
  WebComponent,
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
    BrowserAnimationsModule,
    ...NzModules,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
