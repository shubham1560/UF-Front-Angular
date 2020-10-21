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
import {MatDialogModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRippleModule} from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [],
  imports: [
    DragDropModule,
    MatTreeModule,
    MatTooltipModule,
    MatExpansionModule,
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
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatListModule,
    MatCheckboxModule,
  ],
  exports:[
    DragDropModule,
    MatCheckboxModule,
    MatListModule,
    MatTreeModule,
    MatTooltipModule,
    MatExpansionModule,
    MatRippleModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
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
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: []
  },
  {
    provide: MAT_DIALOG_DATA,
    useValue: []
  }],
})
export class MaterialModule { }
