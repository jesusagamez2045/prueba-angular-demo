import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CorporativosRoutingModule } from './corporativos-routing.module';
import { CorporativosComponent } from './corporativos.component';
import { SharedModule } from 'app/shared/shared.module';
import { DetalleCorporativoComponent } from './components/detalle-corporativo/detalle-corporativo.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CorporativosComponent,
    DetalleCorporativoComponent
  ],
  imports: [
    CommonModule,
    CorporativosRoutingModule,
    SharedModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ]
})
export class CorporativosModule { }
