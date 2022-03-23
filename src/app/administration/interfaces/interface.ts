export interface Usuarios{
    usuarios: Usuario[];
}

export interface Usuario{
    id: number;
    firstname: string;
    secondname: string;
    actived: number;
    email: string;
    type: string;
    email_confirmed: number;
    deleted: number;
    created_at: Date;
}
