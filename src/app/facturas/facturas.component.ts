import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetInfoService } from '../services/get-info.service'
import { Router } from "@angular/router"


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  public medidor: string;
  public cedula: string
  constructor(private route: ActivatedRoute, private infoService: GetInfoService,
    private router : Router) { }

  ngOnInit(): void {
    this.medidor = this.route.snapshot.paramMap.get("id");
    this.cedula = this.route.snapshot.paramMap.get("cedula");
    console.log(this.medidor)
    this.getFacturas();
    
  }
  
  getFacturas(){
    this.infoService.getFacturas(this.medidor).subscribe(facturas => {
      if (Object.keys(facturas).length>0){
        for (var factura in facturas){
          var codigoMedidor = facturas[factura]["CodigoMedidor"]
          var consumo =facturas[factura]["Consumo"]
          var deuda =facturas[factura]["Deuda"]
          var emision =facturas[factura]["FechaEmision"]
          var vence =facturas[factura]["FechaVencimiento"]
          var numero =facturas[factura]["NumeroFactura"]
          let plantilla = `<div class="card grid-item" style="width: 25rem;">
                            <div class="card-body">
                              <h5 class="card-title">Factura ${numero}</h5>
                              <p class="card-text">Fecha Emision: ${emision}</p>
                              <p class="card-text">Fecha Vencimiento: ${vence}</p>
                              <p class="card-text">Consumo: ${consumo}</p>
                              <p class="card-text">Deuda: ${deuda}</p>
                            </div>
                          </div>`

          document.getElementById('contenido').innerHTML += plantilla
        }
      }
      else{
        alert("No hay facturas");
      }
    });
}
  regresar(){
    this.router.navigate(['medidores',this.cedula]);
  }
  perfil(){
    this.router.navigate(['perfil',this.cedula]);
  }
  logout(){
    this.router.navigate(['login']);
  }

}
