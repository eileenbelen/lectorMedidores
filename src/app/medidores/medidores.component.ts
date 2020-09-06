import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetInfoService } from '../services/get-info.service'
import { Router } from "@angular/router"



@Component({
  selector: 'app-medidores',
  templateUrl: './medidores.component.html',
  styleUrls: ['./medidores.component.css']
})
export class MedidoresComponent implements OnInit {
  public cedula: string;
  constructor(private route: ActivatedRoute, private infoService: GetInfoService,
    private router : Router) { }

  ngOnInit(): void {
    this.cedula = this.route.snapshot.paramMap.get("id");
    this.getAllMedidor();
    
    
  }
  getAllMedidor(){
      this.infoService.getMedidores(this.cedula).subscribe(medidores => {
        if (Object.keys(medidores).length>0){
          for (var medidor in medidores){
            var codigoMedidor = medidores[medidor]["CodigoMedidor"]
            var tipo =medidores[medidor]["Tipo"]
            let plantilla = `<div class="card grid-item" style="width: 18rem;">
                              <div class="card-body">
                                <h5 class="card-title">Medidor ${codigoMedidor}</h5>
                                <p class="card-text">Tipo: ${tipo}</p>
                                <a href="facturas/${codigoMedidor}/${this.cedula}">Visualizar Facturas</a>
                              </div>
                            </div>`

            document.getElementById('contenido').innerHTML += plantilla
          }
        }
        else{
          alert("No hay medidores");
        }
      });
  }

  perfil(){
    this.router.navigate(['perfil',this.cedula]);
  }

  logout(){
    this.router.navigate(['login']);
  }

  
  


}
