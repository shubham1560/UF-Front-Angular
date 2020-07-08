import { NgModule } from '@angular/core';
import {
  MatToolbarModule, 
} from '@angular/material';
import { MatButtonModule, MatInputModule, MatFormFieldModule,MatIconModule, MatSidenavModule } from '@angular/material/';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
    MatMenuModule,
  ],
  exports:[
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
    MatMenuModule
  ]
})
export class MaterialModule { }
