import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tarefa } from 'src/app/models/tarefa.model';
import { TarefaService } from 'src/app/servicos/tarefa.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  form: FormGroup = this.fb.group({
    nome: ['',[Validators.required, Validators.minLength(5)]]
  });

  tarefa: Tarefa = new Tarefa('','',false);

  constructor(private route: ActivatedRoute,
              private tarefaService: TarefaService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    //pega o id da URL
    const tarefaId = this.route.snapshot.params['id'];
    this.tarefa = this.tarefaService.listarId(tarefaId);
    this.form.controls['nome'].setValue(this.tarefa.nome);
  }

  editar(){
    if(this.form.invalid){
      return;
    }
    this.tarefa.nome = this.form.value.nome;
    this.tarefaService.editar(this.tarefa);
  }
  

  cssValidacao(campo: string){
    const control = this.form.controls[campo];
    if (control.touched){
      return control.errors ? 'is-invalid' : 'is-valid';
    } else {
      return '';
    }
  }

}
