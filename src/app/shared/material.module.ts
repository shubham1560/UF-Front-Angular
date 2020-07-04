import { NgModule } from '@angular/core';
import {
  MatToolbarModule, 
} from '@angular/material';
import { MatButtonModule, MatInputModule, MatFormFieldModule,MatIconModule, MatSidenavModule } from '@angular/material/';
import {MatProgressBarModule} from '@angular/material/progress-bar';

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
  ],
  exports:[
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatProgressBarModule,
  ]
})
export class MaterialModule { }
