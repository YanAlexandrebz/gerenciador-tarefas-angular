import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarefa } from 'src/app/models/tarefa.model';
import { TarefaService } from 'src/app/servicos/tarefa.service';
import { Ordenacao } from 'src/app/utils/ordenacao.enum';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent implements OnInit {

  tarefas: Tarefa[] = [];
  tarefa: Tarefa = new Tarefa('', '', false);
  ordem: Ordenacao = Ordenacao.ASC;
  filtro: string = '';
  pagina: number = 0;

  constructor(private fb: FormBuilder,
    private tarefaService: TarefaService) { }

  ngOnInit(): void {
    this.carregarTarefas();
  }

  concluir(id: string) {
    this.tarefaService.concluir(id);
    this.carregarTarefas();
  }

  removerId(tarefaId: string){
    this.tarefa = this.tarefaService.listarId(tarefaId);
  }

  remover(){
    this.pagina = 0;
    this.tarefaService.remover(this.tarefa.id);
    this.carregarTarefas();
  }

  ordenar() {
    if (this.ordem === Ordenacao.ASC) {
      this.ordem = Ordenacao.DESC;
    } else {
      this.ordem = Ordenacao.ASC;
    }
    this.carregarTarefas();
  }

  ascendente() {
    return this.ordem === Ordenacao.ASC;
  }

  pesquisar($event: any){
    this.pagina = 0;
    this.filtro = $event.target.value;
    this.carregarTarefas();
  }

  paginar(pagina: number){
    this.pagina = pagina;
    this.carregarTarefas();
  }

  numeroPaginas(){
    return this.tarefaService.numeroPaginas(this.filtro);
  }

  obterPaginas(){
    return [...Array(this.numeroPaginas()).keys()];
  }
  
  private carregarTarefas(){
    this.tarefas = this.tarefaService.listarPaginado(this.ordem, this.filtro, this.pagina);
  }

}
