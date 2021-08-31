export type steps =
  | "Entrevista inicial"
  | "Entrevista técnica"
  | "Oferta"
  | "Asignación"
  | "Rechazo";

export interface Candidate {
  id: string;
  name: string;
  step: steps;
  comments: string;
}
