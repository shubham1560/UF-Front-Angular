"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserprofileModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var profile_component_1 = require("./profile/profile.component");
var userprofile_routing_module_1 = require("./userprofile-routing.module");
var userprofile_service_1 = require("../services/userprofile/userprofile.service");
var material_module_1 = require("../shared/material.module");
var flex_layout_1 = require("@angular/flex-layout");
// import { BookmarkedarticlesComponent } from './bookmarkedarticles/bookmarkedarticles.component';
var table_1 = require("@angular/material/table");
var deleteusermodal_component_1 = require("./deleteusermodal/deleteusermodal.component");
var userprofileedit_component_1 = require("./userprofileedit/userprofileedit.component");
var forms_1 = require("@angular/forms");
var UserprofileModule = /** @class */ (function () {
    function UserprofileModule() {
    }
    UserprofileModule = __decorate([
        core_1.NgModule({
            declarations: [profile_component_1.ProfileComponent,
                // BookmarkedarticlesComponent, 
                deleteusermodal_component_1.DeleteusermodalComponent,
                userprofileedit_component_1.UserprofileeditComponent],
            imports: [
                common_1.CommonModule,
                userprofile_routing_module_1.UserprofileRoutingModule,
                material_module_1.MaterialModule,
                flex_layout_1.FlexLayoutModule,
                table_1.MatTableModule,
                forms_1.ReactiveFormsModule,
            ],
            providers: [userprofile_service_1.UserprofileService,]
        })
    ], UserprofileModule);
    return UserprofileModule;
}());
exports.UserprofileModule = UserprofileModule;
