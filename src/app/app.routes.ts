import { Routes } from '@angular/router';
import { TransferCenterPage } from './pages/transfer-center-page/transfer-center-page';
import { ScoutingPage } from './pages/scouting-page/scouting-page';
export const routes: Routes = [
  {
    path: '',
    component: TransferCenterPage,
  },
  {
    path: 'scouting',
    component: ScoutingPage,
  },
];
