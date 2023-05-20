import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from './cart';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  private baseaddurl ='https://localhost:44355/Order/Add';

  constructor(private http: HttpClient) { }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  //Adding the item into the cart
  addtoCart(product : Cart[]){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }

  //Calculating the total amount
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += (a.price);
      console.log(grandTotal);
    })
    return grandTotal;
  }
  //Remove items from the cart
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

  //Adding the Order
  addOrder(Request: Cart): Observable<Cart> {
    this.cartItemList.push(Request);
    this.productList.next(this.cartItemList);
    this.cartItemList.push(Request);
    this.getTotalPrice();
    //console.log(grandTotal);
    const addRequest:Cart = {
    title:Request.title,
    description:Request.description,
    price:Request.price,
    quantity:Request.quantity,
    total:Request.total
    };
    return this.http.post<Cart>(this.baseaddurl , addRequest);

  }
}
