import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './componentes/cadastrar/cadastrar.component';
import { EditarComponent } from './componentes/editar/editar.component';
import { InicialComponent } from './componentes/inicial/inicial.component';

const routes: Routes = [

  {path: '',component: InicialComponent},
  {path: 'inicial',component: InicialComponent},
  {path: 'cadastrar',component: CadastrarComponent},
  {path: 'editar/:id',component: EditarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
