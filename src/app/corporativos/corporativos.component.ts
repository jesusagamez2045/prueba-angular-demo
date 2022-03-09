import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Corporativo } from './_models/corporativo';
import { CorporativosService } from './_services/corporativos.service';

@Component({
  selector: 'app-corporativos',
  templateUrl: './corporativos.component.html',
  styleUrls: ['./corporativos.component.scss']
})
export class CorporativosComponent implements OnInit {

  public corporativos: Corporativo[] = [];
  public limit: number = 10;
  public ColumnMode = ColumnMode;
  public url: string = 'devschoolcloud.com/sa/#/';

  constructor(
    private readonly _corporativoService: CorporativosService
  ) { }

  ngOnInit(): void {
    this._getCorporativos();
  }

  private _getCorporativos(): void {
    this._corporativoService.getCorporativos().subscribe(data => {
      this.corporativos = data;
      console.log(this.corporativos);
    });
  }

  public onClickUrl(url: string): void {
    window.open(url, '_blank').focus();
  }

  public changeLimit(limit: number): void {
    this.limit = limit;
  }

}
