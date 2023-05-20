// HATIM CODE 
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public totalItem : number = 0;
  public searchTerm !: string;

  logosvg :string="assets/images/Calisya.svg";

  constructor(private cartService :CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }


}