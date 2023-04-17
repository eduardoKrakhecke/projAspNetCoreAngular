import { RedeSocial } from "./redesocial.model";
import { Evento } from "./evento.model";

export class Palestrante {
  id?: number;
  nome: string;
  curriculo: string;
  imageURL: string;
  telefone: string;
  email: string;
  redesSociais: RedeSocial[];
  palestrantesEventos: Evento[];

}
