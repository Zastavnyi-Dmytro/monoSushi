import { Injectable } from '@angular/core';
import { DiscountsRequest } from '../../interfaces/interfaces.component';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private discountCollection: CollectionReference<DocumentData>
  public currentId!:string

  constructor(
    private afs: Firestore
  ) { 
    this.discountCollection = collection(this.afs, "discounts")
   }

  getDiscounts(){
    return collectionData(this.discountCollection, {idField:'id'})
  }

  getOneDiscount(id:string){
    const discountDocumentReference = doc(this.afs, `discounts/${id}`)
    return docData(discountDocumentReference, {idField:'id'})
  }

  create(blog:DiscountsRequest){
    return addDoc(this.discountCollection, blog)
  }

  edit(blog:DiscountsRequest, id:string){
    const discountDocumentReference = doc(this.afs, `discounts/${id}`)
    return updateDoc(discountDocumentReference, {...blog})
  }

  delete(id:string){
    const discountDocumentReference = doc(this.afs, `discounts/${id}`)
    return deleteDoc(discountDocumentReference)
  }
}
