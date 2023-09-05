import { Injectable } from '@angular/core';
import { Products } from '../../interfaces/interfaces.component';
import { ProductsRequest } from '../../interfaces/interfaces.component';
import { CollectionReference, DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  private productCollection: CollectionReference<DocumentData>
  public products:Array<Products> = []

  constructor(
    private afs: Firestore
  ) { 
    this.productCollection = collection(this.afs, "products")
  }

  getProducts(){
    return collectionData(this.productCollection, {idField:'id'})
  }


  getOneProduct(id:string){
    const productDocumentReference = doc(this.afs, `products/${id}`)
    return docData(productDocumentReference, {idField:'id'})
  }

  create(products:ProductsRequest) {
    return addDoc(this.productCollection, products)
  }

  edit(products:ProductsRequest, id:number){
    const productDocumentReference = doc(this.afs, `products/${id}`)
    return updateDoc(productDocumentReference, {...products})
  }

  delete(id:number){
    const productDocumentReference = doc(this.afs, `products/${id}`)
    return deleteDoc(productDocumentReference)
  }


  async getProductsByCategory(category:string) {
    try {
      const querySnapshot = await getDocs(this.productCollection);
      const products: Products[] = [];
  
      querySnapshot.forEach((doc) => {
        const product = doc.data() as Products;
        const path = product['category'];

        if (path['path'] === category) {
          products.push({
            ...product,
            id: doc.id,
          });
        }
      });
  
      return { products };
    } catch (error) {
      console.error("Ошибка при получении данных из коллекции:", error);
      throw error;
    }
  }
}
