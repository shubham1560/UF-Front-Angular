import { NgModule } from '@angular/core';
import {
  MatToolbarModule, 
} from '@angular/material';
import { MatButtonModule, MatInputModule, MatFormFieldModule,MatIconModule, MatSidenavModule } from '@angular/material/';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';


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
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
  ],
  exports:[
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
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
