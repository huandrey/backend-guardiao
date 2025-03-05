import { ConselhoTutelar } from './@types';
import conselhosData from './data/conselhos-tutelares.json';

export class ConselhoTutelarRepository {
  private conselhos: ConselhoTutelar[] = this.validateConselhos(conselhosData.conselhosTutelares);

  private validateConselhos(data: any[]): ConselhoTutelar[] {
    return data.map(item => this.validateConselho(item));
  }

  private validateConselho(item: any): ConselhoTutelar {
    // Garantir que todos os campos obrigatórios existam
    return {
      id: item.id || 0,
      cidade: item.cidade || '',
      endereco: item.endereco || '',
      emails: item.emails || [],
      conselhoDireito: item.conselhoDireito || '',
      conselhoTutelar: item.conselhoTutelar || '',
      conselhosRegionais: item.conselhosRegionais || [],
      subconselhos: item.subconselhos || []
    };
  }


  findAll(): ConselhoTutelar[] {
    return this.conselhos;
  }

  findById(id: number): ConselhoTutelar | undefined {
    return this.conselhos.find(conselho => conselho.id === id);
  }

  findByCidade(cidade: string): ConselhoTutelar | undefined {
    return this.conselhos.find(
      conselho => conselho.cidade.toLowerCase() === cidade.toLowerCase()
    );
  }

  search(termo: string): ConselhoTutelar[] {
    const termoBusca = termo.toLowerCase();
    return this.conselhos.filter(conselho => 
      conselho.cidade.toLowerCase().includes(termoBusca) || conselho.cidade.length &&
      conselho.emails!.some(email => email.toLowerCase().includes(termoBusca))
    );
  }
}
