import { ConselhoTutelar } from './@types';
import { ConselhoTutelarRepository } from './conselho-tutelar-repository';

export class ConselhoTutelarService {
  constructor(private repository: ConselhoTutelarRepository) {}

  getAllConselhos(): ConselhoTutelar[] {
    return this.repository.findAll();
  }

  getConselhoById(id: number): ConselhoTutelar | undefined {
    return this.repository.findById(id);
  }

  getConselhoByCidade(cidade: string): ConselhoTutelar | undefined {
    return this.repository.findByCidade(cidade);
  }

  searchConselhos(termo: string): ConselhoTutelar[] {
    if (!termo.trim()) {
      throw new Error('Termo de busca é obrigatório');
    }
    return this.repository.search(termo);
  }
}
