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

export interface Juegos{
    juegos: Juego[];
}

export interface Juego{
    id: number;
    title: string;
    thumbnail: string;
    short_description: string;
    game_url: string;
    platform: string;
    developer: number;
    readmore: boolean;
}