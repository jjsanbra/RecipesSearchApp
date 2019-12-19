import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../shared/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecipesService } from 'src/app/services/recipes.service';
import { MatSpinner } from '@angular/material';
import { DialogComponent, DialogOverviewComponent } from '../shared/dialog/dialog.component';


@NgModule({
  declarations: [
    HomeComponent,
    DialogComponent,
    DialogOverviewComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    RecipesService
  ],
  entryComponents: [
    MatSpinner,
    DialogComponent,
    DialogOverviewComponent
  ],
  exports: [
    MatSpinner
  ]
})
export class HomeModule { }
