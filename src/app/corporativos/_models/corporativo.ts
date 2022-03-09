import { User } from "./user";

export interface Corporativo {
    id: number;
    S_NombreCorto: string;
    S_NombreCompleto: string;
    S_LogoURL: string;
    S_DBName: string;
    S_DBUsuario: string;
    S_SystemUrl: string;
    S_Activo: number;
    D_FechaIncorporacion: Date;
    created_at: Date;
    updated_at: Date;
    tw_users_id: number;
    FK_Asignado_id: number;
    user_created: User;
    asignado: User;
    tw_contactos_corporativo?: ContactoCorporativo[];
}

export interface ContactoCorporativo {
    N_TelefonoFijo: number;
    N_TelefonoMovil: number;
    S_Comentarios: string;
    S_Email: string;
    S_Nombre: string;
    S_Puesto: string;
    created_at: Date
    id: number;
    tw_corporativo_id: number;
    updated_at: Date;
}