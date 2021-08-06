import { Injectable } from '@angular/core';
import { Tarefa } from '../models/tarefa.model';
import { Ordenacao } from '../utils/ordenacao.enum';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private readonly TOTAL_ELEM_PAG = 3;

  constructor() { }

  listarTodos(): Tarefa[] {
    return  JSON.parse(localStorage['tarefas'] || '[]');
  }

  //ordem = Ordenacao.ASC -> define um parametro padrao
  listarPaginado(ordem = Ordenacao.ASC, filtro = '', pagina = 0): Tarefa[] {
    let tarefas = JSON.parse(localStorage['tarefas'] || '[]');
    //filtro
    tarefas = this.filtrar(tarefas, filtro);
    //ordenação
    if (ordem === Ordenacao.ASC) {
      tarefas.sort((t1: Tarefa, t2: Tarefa) => t1.nome.localeCompare(t2.nome));
    } else {
      tarefas.sort((t1: Tarefa, t2: Tarefa) => t2.nome.localeCompare(t1.nome));
    }
    //paginação
    const indice = pagina * this.TOTAL_ELEM_PAG;
    tarefas = tarefas.slice(indice, indice + this.TOTAL_ELEM_PAG);
    return tarefas;
  }

  adicionar(tarefa: Tarefa) {
    tarefa.id = new Date().getTime().toString();
    tarefa.concluido = false;
    const tarefas = this.listarTodos();
    tarefas.push(tarefa);
    this.persistir(tarefas);
  }

  listarId(id: string): Tarefa {
    const tarefa = this.listarTodos().find(tarefa => tarefa.id === id);
    if (!tarefa) {
      return new Tarefa('', '', false);
    }
    return tarefa;
  }

  editar(tarefa: Tarefa) {
    const tarefas = this.listarTodos().map(t => {
      if (tarefa.id === t.id) {
        t.nome = tarefa.nome;
      }
      return t;
    });
    this.persistir(tarefas);
  }

  editar2(tarefa: Tarefa) {
    const tarefas = this.listarTodos();
    const index = tarefas.findIndex(t => t.id === tarefa.id);
    tarefas[index].nome = tarefa.nome;
    this.persistir(tarefas);
  }

  remover(tarefaId: string) {
    const tarefas = this.listarTodos().filter(tarefa => tarefa.id !== tarefaId);
    this.persistir(tarefas);
  }

  remover2(tarefaId: string) {
    const tarefas = this.listarTodos();
    const index = tarefas.findIndex(t => t.id === tarefaId);
    tarefas.splice(index, 1);
    this.persistir(tarefas);
  }

  concluir(id: string) {
    const tarefas = this.listarTodos();
    for (let tarefa of tarefas) {
      if (tarefa.id == id) {
        tarefa.concluido = !tarefa.concluido;
      }
    }
    this.persistir(tarefas);
  }

  numeroPaginas(filtro: string){
    const tarefas = this.filtrar(this.listarTodos(), filtro);
    //Math.ceil -> retorno o proximo maior arredondado -- ex: 2,6 vira 3
    return Math.ceil(tarefas.length / this.TOTAL_ELEM_PAG); 
  }

  private filtrar(tarefas: Tarefa[], filtro: string): Tarefa[] {
    if (filtro === '') {
      return tarefas;
    }
    return tarefas.filter((tarefa: Tarefa) =>
        tarefa.nome.toLowerCase().startsWith(filtro.toLowerCase()));
  }

  private persistir(tarefas: Tarefa[]) {
    localStorage['tarefas'] = JSON.stringify(tarefas);
    //localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }
}
