import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from 'src/app/Interfaces/property.interface';
import { ProductsListService } from '../../services/products-list.service';

@Component({
  selector: 'app-list',
  template: `
    <div class="content-container">
      <div class="header">
        <h1 class="page__title">Listado de propiedades</h1>
        <div (click)="logOut()">
        <i class="fas fa-sign-out-alt"></i>
        </div>
      </div>
      <div class="properties__container">
        <property-card *ngFor="let property of propertyList"
                      [property]="property"></property-card>
      </div>
    </div>

  `,
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  /**
   * [Storage the list of properties]
   */
  propertyList:Property[] = [];

  /**
   * 
   * @param products 
   * @param router 
   */
  constructor(private products:ProductsListService,
              private router:Router) { }

  ngOnInit(): void {
    this.fetchData();
  }

  /**
   * [fetchData]
   * Used to fetch the properties information
   *
   * @return  {void}    
   */
  fetchData():void{
    this.products.getList().subscribe({
      next: (val:Property[]) =>{
        this.propertyList = val;
      },
      error: () => {}
    })
  }

  /**
   * [logOut]
   *  delete the tokens from the browser
   * and redirects to the login
   * @return  {void}
   */
  logOut():void{
    sessionStorage.clear();
    this.router.navigateByUrl('/auth/ingreso')
  }

}
