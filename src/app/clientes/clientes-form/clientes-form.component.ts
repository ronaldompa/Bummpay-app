import { Component } from '@angular/core';

import { Cliente } from "../cliente"
import { ClientesService } from "../../clientes.service"
import { HttpErrorResponse } from '@angular/common/http';
import { isEmpty, Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

ActivatedRoute

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html'
})

export class ClientesFormComponent {

  cliente: Cliente;
  success: boolean = false;
  errors: String[] = [];
  id: number = 0;

  constructor(
    private service: ClientesService, 
    private router: Router,
    private activatedRouter: ActivatedRoute){

    this.cliente = new Cliente();
  }

  ngOnInit(): void{
    let params : Observable<Params> = this.activatedRouter.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if(this.id){
        this.service
        .getClienteById(this.id)
        .subscribe(
          response => this.cliente = response,
          erroResponse => this.cliente = new Cliente() )
      }
    })

/*
    this.activatedRouter.params.subscribe(params => this.id = params['id']);
    console.log(this.id)   
    if(this.id > 0){
      console.log("Alterar")
      this.service.getClienteById(this.id)
      .subscribe(
         response      => this.cliente = response, 
         errorResponse => this.cliente = new Cliente()
        )
    }*/
    
  }

  voltarParaListagem(){
    console.log("Cliquei");
    this.router.navigate(["/clientes-lista"]);
    
  }

  onSubmit(){
    if(this.id){
      this.service.atualizar(this.cliente)
      .subscribe(response => {
        this.success = true;
        this.errors = [];
      },
      errorResponse => {
        this.errors = ["Erro ao atualizar o Cliente"]

      })



    }else{
        this.service
          .salvar(this.cliente)
          .subscribe( 
              Response =>  {
                this.success = true;
                this.errors = [];
                this.cliente = Response;
              } , 
            errorResponse => {
                this.success = false;
                this.errors = errorResponse.error.erros;        
                console.log(this.errors);
            }
        )
      }
  
  }



}
