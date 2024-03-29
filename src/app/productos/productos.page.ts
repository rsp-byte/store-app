import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UtilidadesService } from '../services/utilidades.service';
import { AlertController } from '@ionic/angular/providers/alert-controller';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  carrito: any[] = [];

  productos: Observable<any[]>;
  
  constructor(private firestore: AngularFirestore, private utilidadesService: UtilidadesService,private toastController: ToastController,) {
    this.productos = this.firestore.collection('productos').valueChanges();
  }

  ngOnInit() {
  }



  cerrarSesion(){
    console.log("Cerrar cesion")
  }

  /*agregarAlCarrito(producto: any): Promise<any> {

    const productoAgregar = {
      uuid: this.utilidadesService.UUID,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad: producto.cantidad,
      sku: producto.sku
    }
    return this.firestore.collection('carrito').add(productoAgregar);
  }*/

  async agregarAlCarrito(producto: any): Promise<any> {
    const productoAgregar = {
      uuid: this.utilidadesService.UUID,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad: producto.cantidad,
      sku: producto.sku
    };
    
    try {
      await this.firestore.collection('carrito').add(productoAgregar);
      this.mostrarToast('Producto agregado al carrito');
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      this.mostrarToast('Error al agregar producto al carrito');
    }
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración del Toast en milisegundos
      position: 'bottom' // Posición del Toast en la pantalla
    });
    toast.present();
  }



}
