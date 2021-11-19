import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public form : FormGroup;
  public error = '';
  public msg = '';
  productId : number;
  product : any = [];
  constructor(private fb: FormBuilder,private route: ActivatedRoute,private productsService : ProductsService) { }

  ngOnInit(): void {
  /*  this.form = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      defaultImage: new FormControl(''),
      price: new FormControl(''),
      discount: new FormControl('')
    }); */
    this.form = this.fb.group({
      name:[''],
      description: [''],
      defaultImage: [''],
      price: [''],
      discount : ['']
    });

    if (this.route.snapshot.queryParams['id']){
      this.route.queryParams.subscribe(params => {
          this.productId = params.id;
        this.getProductById();
        
      });
    }
    

  }

  getProductById(){
    this.productsService.getProductById(this.productId).subscribe(
      res=>{
        this.product = res;
        console.log('from edit')
        console.log(this.product)
        this.form.setValue({
          name: this.product.name,
          description: this.product.description,
          defaultImage: this.product.defaultImage,
          price: this.product.price,
          discount : this.product.discount
       });
      }
    )
}

  onSubmit(){
    if (this.form.valid) {
      let payload ={
        name : this.form.value['name'],
        description : this.form.value['description'],
        defaultImage : this.form.value['defaultImage'],
        images : [this.form.value['defaultImage']],
        price: this.form.value['price'],
        discount : this.form.value['discount']
      }
      if(this.productId){
        this.productsService.updateProduct(payload,this.productId).subscribe(res=>{
          console.log(res);
          this.msg = "Updated Successfully";
        });
      }
      else{
        this.productsService.addProduct(payload).subscribe(res=>{
          console.log(res);
          this.msg = "Saved Successfully";
        });
    }
    }
  }

  onClear(){
    this.product = [];
    this.productId = 0;
    this.form.setValue({
      name: '',
      description: '',
      defaultImage: '',
      price: '',
      discount : ''
   });
  }
}
