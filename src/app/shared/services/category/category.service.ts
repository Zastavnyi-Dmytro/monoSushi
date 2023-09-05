import { Injectable } from '@angular/core';
import { CategoryRequest } from '../../interfaces/interfaces.component';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryCollection: CollectionReference<DocumentData>


  constructor(
    private afs: Firestore
  ) {  
    this.categoryCollection = collection(this.afs, "categories")
  }

  getCategory(){
    return collectionData(this.categoryCollection, {idField:'id'})
  }

  create(category:CategoryRequest){
    return addDoc(this.categoryCollection, category)
  }

  edit(category:CategoryRequest, id:string){
    const categoryDocumentReference = doc(this.afs, `categories/${id}`)
    return updateDoc(categoryDocumentReference, {...category})
  }

  delete(id:string){
    const categoryDocumentReference = doc(this.afs, `categories/${id}`)
    return deleteDoc(categoryDocumentReference)
  }
}
