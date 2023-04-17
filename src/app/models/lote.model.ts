import { Evento } from "./evento.model";

export class Lote {
  id: number;
  nome: string;
  preco: number;
  dataInicio?: Date;
  dataFim?: Date;
  quantidade: number;
  eventoId: number;
  evento: Evento
}
