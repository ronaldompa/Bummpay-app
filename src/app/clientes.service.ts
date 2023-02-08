import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

import { Cliente } from './clientes/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  constructor(private http: HttpClient) { }

  salvar( cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>('http://localhost:8081/bummpay/api/clientes', cliente);    
  }

  atualizar( cliente: Cliente) : Observable<Cliente> {
    return this.http.put<Cliente>(`http://localhost:8081/bummpay/api/clientes/${cliente.id}`,cliente);    
  }
  
  getClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>('http://localhost:8081/bummpay/api/clientes');
  }

  getClienteById(id: number)  : Observable<Cliente>{
    return this.http.get<Cliente>(`http://localhost:8081/bummpay/api/clientes/${id}`);
  }

  deletar( cliente: Cliente) : Observable<any> {
    return this.http.delete<any>(`http://localhost:8081/bummpay/api/clientes/${cliente.id}`);
  }



/*
  getClientes(): Cliente[]{
    let cliente = new Cliente();
    cliente.id = 1;
    cliente.nome ="ROnaldo Lima";
    cliente.dataCadastro = "18/04/2022"
    cliente.cpf = '13245645'
    return [cliente]
  }*/

}
