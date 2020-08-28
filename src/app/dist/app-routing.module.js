"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// import { ArticleListComponent } from './blogs/article-list/article-list.component';
var not_found_component_1 = require("./shared/not-found/not-found.component");
var landing_component_1 = require("./landing/landing.component");
var auth_guard_1 = require("./auth/guard/auth.guard");
var profile_guard_1 = require("./userprofile/guard/profile.guard");
var exploreroots_component_1 = require("./landing/exploreroots/exploreroots.component");
var routes = [
    { path: "welcome", redirectTo: "" },
    {
        path: "",
        component: exploreroots_component_1.ExplorerootsComponent
    },
    {
        path: "dashboard",
        component: landing_component_1.LandingComponent
    },
    {
        path: "auth",
        canActivate: [auth_guard_1.AuthGuard],
        loadChildren: function () {
            return Promise.resolve().then(function () { return require('././auth/auth.module'); }).then(function (m) { return m.AuthModule; });
        }
    },
    {
        path: "user_profile",
        canActivate: [profile_guard_1.ProfileGuard],
        loadChildren: function () {
            return Promise.resolve().then(function () { return require("./userprofile/userprofile.module"); }).then(function (up) { return up.UserprofileModule; });
        }
    },
    {
        path: "courses",
        loadChildren: function () {
            return Promise.resolve().then(function () { return require("./blogs/blogs.module"); }).then(function (bm) { return bm.BlogsModule; });
        }
    },
    {
        path: "roots",
        loadChildren: function () {
            return Promise.resolve().then(function () { return require("./tree/tree.module"); }).then(function (root) { return root.TreeModule; });
        }
    },
    {
        path: "**",
        component: not_found_component_1.NotFoundComponent
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: router_1.NoPreloading })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
