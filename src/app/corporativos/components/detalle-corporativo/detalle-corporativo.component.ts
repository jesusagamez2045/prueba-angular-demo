import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode } from '@swimlane/ngx-datatable';

import { ContactoCorporativo, Corporativo } from 'app/corporativos/_models/corporativo';
import { CorporativosService } from 'app/corporativos/_services/corporativos.service';

@Component({
  selector: 'app-detalle-corporativo',
  templateUrl: './detalle-corporativo.component.html',
  styleUrls: ['./detalle-corporativo.component.scss']
})
export class DetalleCorporativoComponent implements OnInit {

  public id: number;
  public corporativo: Corporativo;
  public corporativoForm: FormGroup;
  public formState: 'edit' | 'readonly' = 'readonly';
  public ColumnMode = ColumnMode;
  public contactoForm: FormGroup;
  public selectedContact: ContactoCorporativo;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _corporativoService: CorporativosService,
    private readonly _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this._initForm();
    this._initContactForm();
    this._route.params.subscribe((params: Params) => {
      this.id = params.id;
      this._getDetalleCorporativo();
    });
  }

  private _initForm(): void {
    this.corporativoForm = this._fb.group({
      S_NombreCorto: ['', [Validators.required]],
      S_NombreCompleto: ['', [Validators.required]],
      S_Activo: ['', [Validators.required]],
      D_FechaIncorporacion: ['', [Validators.required]],
      S_SystemUrl: [{ value: '', disabled: true }, [Validators.required]],
    });
    this.corporativoForm.disable();
  }

  private _initContactForm(): void {
    this.contactoForm = this._fb.group({
      S_Nombre: ['', [Validators.required]],
      S_Puesto: ['', [Validators.required]],
      S_Comentarios: [''],
      N_TelefonoFijo: ['', [Validators.required]],
      N_TelefonoMovil: ['', [Validators.required]],
      S_Email: ['', [Validators.required, Validators.email]],
    });
  }

  private _getDetalleCorporativo(): void {
    this._corporativoService.getCorporativo(this.id).subscribe((data) => {
      this.corporativo = data;
      this._setValueFormCorporativo();
    });
  }

  private _setValueFormCorporativo(): void {
    const fechaIncorporacion = new Date(this.corporativo.D_FechaIncorporacion);
    const formatedDate = new NgbDate(fechaIncorporacion.getFullYear(), fechaIncorporacion.getMonth() + 1, fechaIncorporacion.getDate(),);
    this.corporativoForm.patchValue({
      S_NombreCorto: this.corporativo.S_NombreCorto,
      S_NombreCompleto: this.corporativo.S_NombreCompleto,
      S_Activo: this.corporativo.S_Activo,
      D_FechaIncorporacion: formatedDate,
      S_SystemUrl: this.corporativo.S_SystemUrl
    });
  }

  public onClickEditForm(value: 'edit' | 'readonly'): void {
    this.formState = value;
    if (value === 'readonly') {
      this.corporativoForm.disable();
    } else {
      this.corporativoForm.enable();
      this.corporativoForm.get('S_SystemUrl').disable();
    }
  }

  public onClickEditContact(contact: ContactoCorporativo): void {
    this.selectedContact = contact;
    this.contactoForm.patchValue({
      S_Nombre: contact.S_Nombre,
      S_Puesto: contact.S_Puesto,
      S_Comentarios: contact.S_Comentarios ?? '',
      N_TelefonoFijo: contact.N_TelefonoFijo,
      N_TelefonoMovil: contact.N_TelefonoMovil,
      S_Email: contact.S_Email,
    });
  }

  public resetContactData(): void {
    this.selectedContact = null;
    this.contactoForm.patchValue({
      S_Nombre: '',
      S_Puesto: '',
      S_Comentarios: '',
      N_TelefonoFijo: '',
      N_TelefonoMovil: '',
      S_Email: '',
    });
    this.contactoForm.reset();
  }

  public onSubmit(): void {
    if (this.corporativoForm.valid) {
      const date = this.corporativoForm.get('D_FechaIncorporacion').value;
      const formatedDate = `${date.year}-${date.month}-${date.day}`;
      const idCorporativo = this.corporativo.id;
      const body = {
        ...this.corporativoForm.value,
        id: idCorporativo,
        FK_Asignado_id: this.corporativo.FK_Asignado_id,
        D_FechaIncorporacion: formatedDate,
        S_LogoURL: this.corporativo.S_LogoURL
      };
      this._corporativoService.updateCorporativo(idCorporativo, body).subscribe((data) => {
        this.corporativo = data;
        this._setValueFormCorporativo();
        this.corporativoForm.disable();
        this.formState = 'readonly';
      });
    }
  }

  public onSubmitContactForm(): void {
    if (this.contactoForm.valid) {
      console.log(this.contactoForm.value);
      const body = {
        ...this.contactoForm.value,
        tw_corporativo_id: this.corporativo.id
      };
      if(this.selectedContact) {
        this._corporativoService.updateContacto(this.selectedContact.id, body).subscribe((data) => {
          this.selectedContact = data;
          const newContactos = this.corporativo.tw_contactos_corporativo.filter(contacto => contacto.id !== this.selectedContact.id);
          this.corporativo.tw_contactos_corporativo = [...newContactos, data];
        });
      } else {
        this._corporativoService.createContacto(body).subscribe((data) => {
          this.selectedContact = data;
          const newContactos = this.corporativo.tw_contactos_corporativo;
          this.corporativo.tw_contactos_corporativo = [...newContactos, data];
        });
      }
    }
  }

  public deleteContacto(id: number): void {
    this._corporativoService.deleteContacto(id).subscribe(() => {
      if(id === this.selectedContact?.id) {
        this.resetContactData();
      }
      this.corporativo.tw_contactos_corporativo = this.corporativo.tw_contactos_corporativo.filter(contacto => contacto.id !== id);
    });
  }

}
