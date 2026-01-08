import { Routes } from '@angular/router';
import { Dashbord } from './Pages/dashbord/dashbord';
import { Members } from './Pages/members/members';
import { Satff } from './Pages/satff/satff';
import { EquipmentComponent } from './Pages/equipment/equipment';
import { Finace } from './Pages/finace/finace';
import { Reports } from './Pages/reports/reports';

import { Users } from './Pages/users/users';
import { Grid } from './Pages/grid/grid';



export const routes: Routes = [
    {
        path: 'Dashboard',
        component: Dashbord
    },
    {
        path: 'Users',
        component: Users
    },
     {
        path: 'Grid',
        component: Grid
    },
    {
        path: 'MembersPage',
        component: Members
    },
    {
        path: 'staffPage',
        component: Satff
    },
    {
        path: 'Equipments',
        component: EquipmentComponent
    },
    {
        path: 'finances',
        component: Finace
    },
    {
        path: 'reports',
        component: Reports
    }
];
