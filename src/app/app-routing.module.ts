import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './_helpers';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { LoginComponent } from './management/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Home'
    }
  },
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    data: {
      title: 'Login'
    },
    children: [
      {
        path: 'login',
        loadChildren: () => import('./management/management.module').then(u => u.ManagementModule)
      }
    ]
  }, 
  {
    path: 'billing',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    data: {
      title: 'Billing'
    },
    children: [
      {

        path: '',
        loadChildren: () => import('./billing/billing.module').then(u => u.BillingModule)
      }
    ]
  }, {
    path: 'fleet',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    data: {
      title: 'fleet'
    },
    children: [
      {

        path: '',
        loadChildren: () => import('./fleet/fleet.module').then(u => u.FleetModule)
      }
    ]
  }, {
    path: 'operationManagement',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    data: {
      title: 'operation'
    },
    children: [
      {

        path: '',
        loadChildren: () => import('./operationManagement/operation.module').then(u => u.OperationModule)
      }
    ]
  },
  {
    path: 'waterSupplyManagement',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    data: {
      title: 'waterSupplyManagement'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./waterSupplyManagement/waterSupplyManagement.module').then(u => u.waterSupplyManagementModule)
      }
    ]
  },
  {
    path: 'maintenanceAndEveluation',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    data: {
      title: 'maintenanceAndEveluation'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./maintenance-and-evelation/maintenance-and-evelation.module').then(u => u.MaintenanceAndEvelationModule)
      }
    ]
  },
  {
    path: 'wasteManagement',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    data: {
      title: 'Waste Management'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./wastemanagement/wastemanagement.module').then(u => u.WastemanagementModule)
      }
    ]
   }
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
