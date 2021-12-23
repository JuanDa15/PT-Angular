import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from 'src/app/Interfaces/property.interface';
import { ProductsListService } from '../../services/products-list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  propertyList:Property[] = [];

  constructor(private products:ProductsListService,
              private router:Router) { }

  ngOnInit(): void {
    this.products.getList().subscribe({
      next: (val:any) =>{
        this.propertyList = val;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  logOut(){
    sessionStorage.clear();
    this.router.navigateByUrl('/auth/ingreso')
  }

}
