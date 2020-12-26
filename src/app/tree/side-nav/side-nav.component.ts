import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { queue } from 'rxjs';


interface Category {
  label: string;
  id: string;
  parent_catgory: string;
  parent_kb_base: string;
  children?: Category[];
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private knowledgeService: DataService,
    private loggerService: LoggerService,
    private authService: AuthService,
    private userService: UserprofileService,
  ) {
    // console.log(this.tree_data);
  }

  hasChild = (_: number, node: Category) => !!node.children && node.children.length > 0;

  icon = "menu";
  view = "course";
  viewChangeValid = true;
  initialized_kb_base = "";
  active_id = ""
  isLoading = true;
  isModerator = false;
  // categories = [];
  tree_data: Category[];
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      setTimeout(() => {
        this.userService.inGroup("Moderators").subscribe(
          (result: any) => {
            this.isModerator = result;
          }
        )
      }, 500)
    }

    this.route.paramMap.subscribe(
      (result: any) => {
        this.active_id = result.params.kb_category;
        this.view = result.params.view;
        if (localStorage.getItem("view")) {
          this.view = localStorage.getItem("view")
        }
        this.viewChangeValid = true;
        if (result.params.kb_category != "root") {
          this.viewChangeValid = false;
        }
        if (result.params.kb_base != this.initialized_kb_base) {
          this.isLoading = true;
          this.knowledgeService.getCategoriesForSideNav(result.params.kb_base).subscribe(
            (result: any) => {
              this.tree_data = result;
              this.dataSource.data = this.tree_data;
              this.isLoading = false;
              var test = this.tree_data
              this.categoriesSort(test);
            }
          )
        }
        this.initialized_kb_base = result.params.kb_base;
      }
    )
    this.loggerService.logData("uf-side-nav", this);
  }

  treeControl = new NestedTreeControl<Category>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();

  categoriesSort(array_to_find_count) {
    var finArray = [];
    array_to_find_count.forEach(element => {
      finArray.push(element);
    });

    var array_with_right_course_number = [];
    var maxLevel = 0
    while (finArray.length > 0) {
      var a = finArray.pop()
      array_with_right_course_number.push(a);
      var child = this.getChildrenArray(a);
      child.forEach(child => {
        finArray.push(child);
        if (child.level > maxLevel) {
          maxLevel = child.level;
        }
      })
    }

    while (maxLevel >= 0) {
      array_with_right_course_number.forEach(element => {
        if (element.level == maxLevel) {
          var par_index = this.findArrayIndex(array_with_right_course_number, element.parent_category);
          // console.log(element.parent_category);
          if (par_index != undefined) {
            array_with_right_course_number[par_index].course_count += element.course_count;
          }
          // console.log(par_index);
        }
      })
      maxLevel -= 1;
    }
    // console.log(array_with_right_course_number);
  }

  findArrayIndex(array: any, parent_id) {
    var parent_index = undefined;
    array.forEach(function (element, index) {
      if (element.id == parent_id) {
        parent_index = index;
      }
    })
    return parent_index;
  }

  getChildrenArray(element) {
    var child = [];
    element.children.forEach(element => {
      child.push(element);
    });
    // console.log(child);
    return child
  }

  changeView(changedView) {
    if (changedView == "tree") {
      this.view = "tree";
    }
    else if (changedView == "course") {
      this.view = "course";
    }
    localStorage.setItem("view", this.view);
  }

}
