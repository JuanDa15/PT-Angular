import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FormErrorDirective } from './directives/form-error.directive';
import { FooterComponent } from './components/footer/footer.component';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { InputHelperDirective } from './directives/input-helper.directive';
import { MinimapComponent } from './components/minimap/minimap.component';
import { PropertyCardComponent } from './components/property-card/property-card.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FormErrorDirective,
    FooterComponent,
    FloatingButtonComponent,
    InputHelperDirective,
    MinimapComponent,
    PropertyCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FormErrorDirective,
    FooterComponent,
    FloatingButtonComponent,
    InputHelperDirective,
    MinimapComponent,
    PropertyCardComponent
  ]
})
export class SharedModule { }
