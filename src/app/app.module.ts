import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './_helpers/shared.module';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './_helpers';
import { UtilsService } from './_services/utils.service';
import { DateFormatPipe } from './_helpers/date-format.pipe';
import { CustomFormatterPipe } from './_helpers/custom-formatter.pipe';
import {TextFieldModule} from '@angular/cdk/text-field';;



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    TextFieldModule,
  
 
  ],
  declarations: [

    AppComponent,
    MainLayoutComponent,
    SimpleLayoutComponent,
    
  ],

  entryComponents: [
  ],
  providers: [
    DateFormatPipe,
    DecimalPipe,
    CustomFormatterPipe,
    UtilsService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
