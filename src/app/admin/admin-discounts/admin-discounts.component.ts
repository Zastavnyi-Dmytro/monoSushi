import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Discounts } from 'src/app/shared/interfaces/interfaces.component';
import { DiscountService } from 'src/app/shared/services/discounts/discount.service';
import { Storage, deleteObject, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-discounts',
  templateUrl: './admin-discounts.component.html',
  styleUrls: ['./admin-discounts.component.scss']
})
export class AdminDiscountsComponent {
  addMenu = false
  editMode = false
  editId!: number
  data!: Date
  uploadPercent!: number
  isUploaded = false
  showProgress!:boolean
  deletedImg = false

  public discountForm!: FormGroup

  public adminDiscounts: Array<Discounts> = []

  constructor(
    private discountsBase: DiscountService,
    private fb: FormBuilder,
    private storage: Storage
  ) { }
  ngOnInit(): void {
    this.getDiscounts()
    this.initDiscountForm()
  }

  getDiscounts(): void {
    this.discountsBase.getDiscounts().subscribe(data => {
      this.adminDiscounts = data
    })
  }

  openAddMenu() {
    this.addMenu = !this.addMenu
  }

  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      img: [null, Validators.required],
      date:[new Date]
    })
  }

  addDiscount() {
    if (this.editMode) {
      this.discountsBase.edit(this.discountForm.value, this.editId).subscribe(() => {
        this.getDiscounts()
        this.discountForm.reset()
      })
      this.editMode = false
      this.addMenu = false
    }
    else {
      this.discountForm.value.date = new Date
      this.discountsBase.create(this.discountForm.value).subscribe(() => {
        this.getDiscounts()
        this.discountForm.reset()
        this.addMenu = false
      })
    }
    this.isUploaded = false
    this.uploadPercent = 0
    this.showProgress = false
  }

  editDiscount(discount: Discounts): void {
    this.discountForm.patchValue({
      name: discount.name,
      title: discount.title,
      description: discount.description,
      date: discount.date,
      img:discount.img
    })
    this.isUploaded = true
    this.addMenu = true
    this.editMode = true
    this.editId = discount.id
  }

  deleteDiscount(discount: Discounts): void {
    this.discountsBase.delete(discount.id).subscribe(() => {
      this.getDiscounts()
      this.uploadPercent = 0
    })
  }

  upload(event: any): void {
    this.showProgress = true
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
    .then(data=>{
      this.discountForm.patchValue({
        img:data
      })
      this.isUploaded = true
      this.deletedImg = false
    })
    .catch(err=>{
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

  valueByControl(control:string):string{
    return this.discountForm.get(control)?.value
  }

  deleteImg():void{
    const task = ref(this.storage, this.valueByControl('img'));
    deleteObject(task).then(()=>{
      console.log('file deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.discountForm.patchValue({
        img:[null]
      })
    },()=>{
      this.isUploaded = false
    })
    this.showProgress = false
    this.deletedImg = true
  }
}
