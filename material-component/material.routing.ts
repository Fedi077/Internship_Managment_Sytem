import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageCategoryStageComponent } from './manage-category-stage/manage-category-stage.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageStageComponent } from './manage-stage/manage-stage.component';
import { ManageInfStageComponent } from './manage-inf-stage/manage-inf-stage.component';
import { AffectedInternshipsComponent } from './affected-internships/affected-internships.component';
import { ManageUserComponent } from './manage-user/manage-user.component';



export const MaterialRoutes: Routes = [
    {
        path: 'category',
        component:ManageCategoryStageComponent,
       canActivate:[RouteGuardService],
        data:{
            expectRole:['admin']
        }
    },
    {
        path: 'stage',
        component:ManageStageComponent,
        canActivate:[RouteGuardService],
        data:{
            expectRole:['admin']
        }
    },
    {
        path: 'infostage',
        component:ManageInfStageComponent,
        canActivate:[RouteGuardService],
        data:{
            expectRole:['admin','user']
        }
    },
    {
        path: 'Affectedinternships',
        component:AffectedInternshipsComponent,
        canActivate:[RouteGuardService],
        data:{
            expectRole:['admin','user']
        }
    },
    {
        path: 'user',
        component:ManageUserComponent,
        canActivate:[RouteGuardService],
        data:{
            expectRole:['admin']
        }
    }
];
