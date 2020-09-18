"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SideNavComponent = void 0;
var core_1 = require("@angular/core");
var tree_1 = require("@angular/cdk/tree");
var tree_2 = require("@angular/material/tree");
var TREE_DATA = [
    {
        name: 'Fruit',
        children: [
            { name: 'Apple' },
            { name: 'Banana' },
            { name: 'Fruit loops' },
        ]
    }, {
        name: 'Vegetables',
        children: [
            {
                name: 'Green',
                children: [
                    { name: 'Broccoli' },
                    { name: 'Brussels sprouts' },
                ]
            }, {
                name: 'Orange',
                children: [
                    { name: 'Pumpkins' },
                    { name: 'Carrots' },
                ]
            },
        ]
    },
];
var SideNavComponent = /** @class */ (function () {
    function SideNavComponent(route, knowledgeService, loggerService) {
        this.route = route;
        this.knowledgeService = knowledgeService;
        this.loggerService = loggerService;
        this.hasChild = function (_, node) { return !!node.children && node.children.length > 0; };
        this.icon = "menu";
        this.view = "course";
        this.viewChangeValid = true;
        this.initialized_kb_base = "";
        this.active_id = "";
        this.treeControl = new tree_1.NestedTreeControl(function (node) { return node.children; });
        this.dataSource = new tree_2.MatTreeNestedDataSource();
        // console.log(this.tree_data);
    }
    SideNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (result) {
            _this.active_id = result.params.kb_category;
            _this.view = result.params.view;
            if (localStorage.getItem("view")) {
                _this.view = localStorage.getItem("view");
            }
            _this.viewChangeValid = true;
            if (result.params.kb_category != "root") {
                _this.viewChangeValid = false;
            }
            if (result.params.kb_base != _this.initialized_kb_base) {
                // console.log("change in base");
                _this.knowledgeService.getCategoriesForSideNav(result.params.kb_base).subscribe(function (result) {
                    // this.categories = result;
                    _this.tree_data = result;
                    _this.dataSource.data = _this.tree_data;
                    // console.log(result);
                });
            }
            _this.initialized_kb_base = result.params.kb_base;
        });
        this.loggerService.logData("uf-side-nav", this);
    };
    SideNavComponent.prototype.changeView = function (changedView) {
        // console.log(changedView);
        if (changedView == "tree") {
            this.view = "tree";
        }
        else if (changedView == "course") {
            this.view = "course";
        }
        localStorage.setItem("view", this.view);
    };
    SideNavComponent = __decorate([
        core_1.Component({
            selector: 'app-side-nav',
            templateUrl: './side-nav.component.html',
            styleUrls: ['./side-nav.component.scss']
        })
    ], SideNavComponent);
    return SideNavComponent;
}());
exports.SideNavComponent = SideNavComponent;
