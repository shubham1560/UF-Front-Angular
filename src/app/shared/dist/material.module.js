"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MaterialModule = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material/");
var progress_bar_1 = require("@angular/material/progress-bar");
var card_1 = require("@angular/material/card");
var menu_1 = require("@angular/material/menu");
var tabs_1 = require("@angular/material/tabs");
var paginator_1 = require("@angular/material/paginator");
var table_1 = require("@angular/material/table");
var dialog_1 = require("@angular/material/dialog");
var snack_bar_1 = require("@angular/material/snack-bar");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var core_2 = require("@angular/material/core");
var expansion_1 = require("@angular/material/expansion");
var tooltip_1 = require("@angular/material/tooltip");
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        core_1.NgModule({
            declarations: [],
            imports: [
                tooltip_1.MatTooltipModule,
                expansion_1.MatExpansionModule,
                material_1.MatToolbarModule,
                material_2.MatButtonModule,
                material_2.MatFormFieldModule,
                material_2.MatIconModule,
                material_2.MatSidenavModule,
                material_2.MatInputModule,
                progress_bar_1.MatProgressBarModule,
                card_1.MatCardModule,
                menu_1.MatMenuModule,
                tabs_1.MatTabsModule,
                paginator_1.MatPaginatorModule,
                table_1.MatTableModule,
                dialog_1.MatDialogModule,
                snack_bar_1.MatSnackBarModule,
                progress_spinner_1.MatProgressSpinnerModule,
                core_2.MatRippleModule,
            ],
            exports: [
                tooltip_1.MatTooltipModule,
                expansion_1.MatExpansionModule,
                core_2.MatRippleModule,
                snack_bar_1.MatSnackBarModule,
                progress_spinner_1.MatProgressSpinnerModule,
                dialog_1.MatDialogModule,
                table_1.MatTableModule,
                paginator_1.MatPaginatorModule,
                tabs_1.MatTabsModule,
                material_1.MatToolbarModule,
                material_2.MatButtonModule,
                material_2.MatFormFieldModule,
                material_2.MatIconModule,
                material_2.MatSidenavModule,
                material_2.MatInputModule,
                progress_bar_1.MatProgressBarModule,
                card_1.MatCardModule,
                menu_1.MatMenuModule
            ],
            providers: [{
                    provide: dialog_1.MatDialogRef,
                    useValue: []
                },
                {
                    provide: dialog_1.MAT_DIALOG_DATA,
                    useValue: []
                }]
        })
    ], MaterialModule);
    return MaterialModule;
}());
exports.MaterialModule = MaterialModule;
