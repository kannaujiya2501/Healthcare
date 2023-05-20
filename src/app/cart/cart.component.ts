import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Medicine } from '../medicine';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from '../cart';
import { Subscriber } from 'rxjs';
import { ActivatedRoute,Router} from '@angular/router';
import { FormGroup, Validators,FormControl } from '@angular/forms';
import { NgbDayTemplateData } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { TagOpenStartToken } from '@angular/compiler/src/ml_parser/tokens';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  public products : any = [];
  public grandTotal !: number;

  Price:  null | undefined | number|DoubleRange|string;
  quantity:null | undefined | number|DoubleRange|string;
  total: null | undefined | number|DoubleRange|string;

  cart1:Cart={
    title:'',
    description:'',
    price:0,
    quantity:0,
    total:0,

  }

  constructor(private cart:CartService,private snackbar:MatSnackBar,
  private readonly route: ActivatedRoute, 
  private router: Router) { }
  ngOnInit(): void {
    

   //Add the item into cart  
    this.cart.getProducts().subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cart.getTotalPrice();
    })
  }

  //Remove item from the cart
  removeItem(item:any){
    this.cart.removeCartItem(item);
  }

  //Remove the item
  emptycart(){
    this.cart.removeAllCart();
  }

  //add method
  onAdd(): void {
    this.cart.addOrder(this.cart1)
      .subscribe(
        (successResponse) => {
          this.snackbar.open(' added successfully', undefined, {
            duration: 2000
          });

        },
        (errorResponse) => {
          // Log
          console.log(errorResponse);
        }
      );
  }

  
  }


