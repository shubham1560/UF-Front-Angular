import { NgModule } from '@angular/core';
import {
  MatToolbarModule, 
} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/';
import {MatFormFieldModule} from '@angular/material/';
import {MatIconModule} from '@angular/material/';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  exports:[
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class MaterialModule { }
