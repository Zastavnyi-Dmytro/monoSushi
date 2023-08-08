import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, Products } from 'src/app/shared/interfaces/interfaces.component';
import { ProductService } from 'src/app/shared/services/products/product.service';
import { Storage, deleteObject, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {
  addMenu = false
  editMode = false
  editId!: number
  uploadPercent!: number
  isUploaded = false
  showProgress!: boolean
  deletedImg = false

  public productForm!: FormGroup

  public adminProducts: Array<Products> = []
  public adminCategories:Array<Category> = []

  constructor(
    private productsBase: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private storage: Storage
  ) { }
  ngOnInit(): void {
    this.getProducts()
    this.initProductForm()
    this.loadCategories()
  }

  getProducts(): void {
    this.productsBase.getProducts().subscribe(data => {
      this.adminProducts = data
    })
  }

  loadCategories(): void {
    this.categoryService.getCategory().subscribe(data => {
      this.adminCategories = data;
      this.productForm.patchValue({
        category: this.adminCategories[0].id
      })
    })
  }

  openAddMenu() {
    this.addMenu = !this.addMenu
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      path: [null, Validators.required],
      name: [null, Validators.required],
      ingredients: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      img: [null, Validators.required],
      category: [null, Validators.required],
      count:[1]
    })
  }

  addProduct() {
    if (this.editMode) {
      this.productsBase.edit(this.productForm.value, this.editId).subscribe(() => {
        this.getProducts()
        this.productForm.reset()
      })
      this.editMode = false
      this.addMenu = false
    }
    else {
      this.productsBase.create(this.productForm.value).subscribe(() => {
        this.getProducts()
        this.productForm.reset()
        this.addMenu = false
      })
    }
    this.isUploaded = false
    this.uploadPercent = 0
    this.showProgress = false
  }

  editProduct(product: Products): void {
    this.productForm.patchValue({
      name: product.name,
      path: product.path,
      ingredients: product.ingredients,
      weight: product.weight,
      price: product.price,
      img: product.img,
      count:product.count
    })
    this.isUploaded = true
    this.addMenu = true
    this.editMode = true
    this.editId = product.id
  }

  deleteProduct(product: Products): void {
    this.productsBase.delete(product.id).subscribe(() => {
      this.getProducts()
      this.uploadPercent = 0
    })
  }

  upload(event: any): void {
    this.showProgress = true
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          img: data
        })
        this.isUploaded = true
        this.deletedImg = false
      })
      .catch(err => {
        console.log(err)
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = ''
    if (file) {
      try {
        const storageRef = ref(this.storage, path)
        const task = uploadBytesResumable(storageRef, file)
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        })
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e)
      }
    }
    else {
      console.log('Помилка')
    }
    return Promise.resolve(url)
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value
  }

  deleteImg(): void {
    const task = ref(this.storage, this.valueByControl('img'));
    deleteObject(task).then(() => {
      console.log('file deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.productForm.patchValue({
        img: [null]
      })
    }, () => {
      this.isUploaded = false
    })
    this.showProgress = false
    this.deletedImg = true
  }
}
