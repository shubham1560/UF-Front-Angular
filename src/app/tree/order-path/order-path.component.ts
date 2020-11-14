import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-path',
  templateUrl: './order-path.component.html',
  styleUrls: ['./order-path.component.scss']
})
export class OrderPathComponent implements OnInit {
  constructor(
    private knowledge: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private loggerService: LoggerService,
    private _snackBar: MatSnackBar
  ) { }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.paths?.categories, event.previousIndex, event.currentIndex);
  }

  roots;
  loading = false;
  paths
  articles
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      params => {
        if (params.get('root')) {
          this.knowledge.getRelatedCategories(params.get('root'), 'root', 'course').subscribe(
            result => {
              this.paths = result;
            }
          )
        }
        else {
          this.paths = [];
        }
      }
    )
    this.loggerService.logData("st-order-root", this);
  }

  fetchData() {
    this.loading = true;
    this.getBases();
  }

  getBases() {
    this.knowledge.getKnowledgeBases().subscribe(
      result => {
        this.loading = false;
        this.roots = result;
      },
      error => {
        this.loading = false;
      }
    )
  }

  finalArray = []

  addOrder() {
    var order = 100
    this.finalArray = [];
    this.paths.categories.forEach(element => {
      // console.log(element);
      element.order = order;
      order += 100;
      this.finalArray.push({
        "id": element.id,
        "order": element.order,
        "label": element.label
      })
    });
    console.log(this.finalArray);
  }

  saveOrder(){
    this.addOrder();
    this.knowledge.orderCoursesCategory(this.finalArray).subscribe(
      result=>{
        console.log();
        this.openSnackBar("Updated!")
      },
      error=>{
        this.openSnackBar("Some error occured");
      }
    )
  }

  openSnackBar(message) {
    this._snackBar.open(message, '', {
      duration: 500,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

}
