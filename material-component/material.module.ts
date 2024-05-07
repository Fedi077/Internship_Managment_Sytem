import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ManageCategoryStageComponent } from './manage-category-stage/manage-category-stage.component';
import { CategoryComponent } from './dialog/category/category.component';
import { ManageInfStageComponent } from './manage-inf-stage/manage-inf-stage.component';
import { AffectedInternshipsComponent } from './affected-internships/affected-internships.component';
import { ManageStageComponent } from './manage-stage/manage-stage.component';
import { StageComponent } from './dialog/stage/stage.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    ManageCategoryStageComponent,
    CategoryComponent,
    ManageInfStageComponent,
    AffectedInternshipsComponent,
    ManageStageComponent,
    StageComponent,
    ManageUserComponent    
  ]
})
export class MaterialComponentsModule {}
