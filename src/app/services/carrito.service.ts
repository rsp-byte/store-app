import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Producto } from '../modelo/Producto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private firestore: AngularFirestore) { }

  agregarAlCarrito(producto: Producto, uuid: string) {
    return this.firestore.collection('carritos').doc(uuid).collection('productos').add(producto);
  }

  eliminarDelCarrito(productoId: string, uuid: string) {
    return this.firestore.collection('carritos').doc(uuid).collection('productos').doc(productoId).delete();
  }

  obtenerProductosDelCarrito(uuid: string): Observable<Producto[]> {
    return this.firestore.collection('carritos').doc(uuid).collection('productos').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Producto;
          const id = a.payload.doc.id;
          return {...data };
        });
      })
    );
  }
}
