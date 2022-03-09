import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { FilterPipe } from './filter.pipe';
import { SearchPipe } from './search.pipe';
import { ShortNamePipe } from './short-name.pipe';
import { StatePipe } from './state.pipe';

@NgModule({
  declarations:[FilterPipe, SearchPipe, ShortNamePipe, StatePipe],
  imports:[CommonModule],
  exports:[FilterPipe, SearchPipe, ShortNamePipe, StatePipe]
})

export class PipeModule{}
