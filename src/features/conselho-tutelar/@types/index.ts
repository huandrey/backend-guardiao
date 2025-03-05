export type SubConselho = {
  setor: string;
  emails: string[];
  conselhoDireito: string;
  conselhoTutelar: string;
}

export type ConselhoRegional = {
  setor: string;
  nome: string;
  contato: string[];
  bairros: string[];
}

export type ConselhoTutelar = {
  id: number;
  cidade: string;
  endereco: string;
  emails: string[];
  conselhoDireito: string;
  conselhoTutelar: string;
  conselhosRegionais?: ConselhoRegional[];
  subconselhos?: SubConselho[]
}
