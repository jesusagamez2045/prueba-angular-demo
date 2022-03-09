export interface User {
    id: number;
    username: string;
    email: string;
    S_Nombre: string;
    S_Apellidos: string;
    S_FotoPerfilURL: string;
    S_Activo: number;
    verification_token: string;
    verified: string;
    tw_role_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    banned: number;
}