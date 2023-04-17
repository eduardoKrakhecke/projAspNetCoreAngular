import { Lote } from "./lote.model";
import { RedeSocial } from "./redesocial.model";
import { Palestrante } from "./palestrante.model";

export class Evento {
  id?: number;
  local: string;
  dataEvento: Date;
  tema: string;
  qtdPessoas: number;
  imageURL: string;
  telefone: string;
  email: string;
  lotes: Lote[];
  redesSociais: RedeSocial[];
  palestrantesEventos: Palestrante[];

}
