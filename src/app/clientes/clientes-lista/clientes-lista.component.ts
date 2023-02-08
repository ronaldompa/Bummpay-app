import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html'
})
export class ClientesListaComponent implements OnInit{

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente = new Cliente();
  mensagemSucesso : String = "";
  mensagemErro : String = "";

  constructor(
    private service : ClientesService, 
    private router:Router) {    }

  ngOnInit():void {
      this.service
      .getClientes()
      .subscribe ( resposta => {this.clientes = resposta });
  }

  novoCadastro(){
    this.router.navigate(["/clientes-form"])
  }

  preparaDelecao(cliente: Cliente){
    this.clienteSelecionado = cliente;
  }
  
  deletarClinte(){
    this.service.deletar(this.clienteSelecionado)
    .subscribe(
      response => {
        this.mensagemSucesso = "Cliente deletado com sucesso",
        this.ngOnInit();
      },
      erro => this.mensagemErro = "Ocorreu erro ao deletar o cliente")
    console.log(this.clienteSelecionado);
  }

}
