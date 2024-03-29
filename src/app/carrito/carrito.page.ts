import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Producto } from '../modelo/Producto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UtilidadesService } from '../services/utilidades.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {


  productos: Observable<any[]>;// Aquí deberías tener la lista de productos en el carrito

 
  constructor(private firestore: AngularFirestore, private utilidadesService: UtilidadesService,
    ) {
      this.productos = this.obtenerCarrito(this.utilidadesService.UUID)
     }
  ngOnInit(): void {
   console.log('Method not implemented.');

  }

  obtenerCarrito(usuarioId: string): Observable<any[]> {
    return this.firestore.collection('carrito', ref => ref.where('uuid', '==', usuarioId)).valueChanges();
  }



  async eliminarProductoPorSKU(sku: string): Promise<void> {
    try {
      const querySnapshot = await this.firestore.collection('carrito', ref => ref.where('sku', '==', sku)).get().toPromise();
      if (querySnapshot) {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
      } else {
        console.error('No se encontraron documentos que coincidan con el SKU:', sku);
      }
    } catch (error) {
      console.error('Error al eliminar producto del carrito por SKU:', error);
      throw error;
    }
  }


}
