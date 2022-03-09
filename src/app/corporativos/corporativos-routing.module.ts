import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorporativosComponent } from './corporativos.component';
import { DetalleCorporativoComponent } from './components/detalle-corporativo/detalle-corporativo.component';


const routes: Routes = [
  {
    path: '',
    component: CorporativosComponent,
    data: {
      title: 'Corporativos'
    }
  },
  {
    path: 'detalle/:id',
    component: DetalleCorporativoComponent,
    data: {
      title: 'Corporativos detalle'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporativosRoutingModule { }
