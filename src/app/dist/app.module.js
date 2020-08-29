"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var not_found_component_1 = require("./shared/not-found/not-found.component");
var animations_1 = require("@angular/platform-browser/animations");
var material_module_1 = require("./shared/material.module");
var auth_service_1 = require("./services/authservice/auth.service");
var knowledge_service_1 = require("./services/knowledgeservice/knowledge.service");
var realtimelogger_service_1 = require("./services/cx-menu/realtimelogger.service");
var landing_module_1 = require("./landing/landing.module");
var flex_layout_1 = require("@angular/flex-layout");
var header_component_1 = require("./shared/header/header.component");
var urlconfig_service_1 = require("./services/urlconfig.service");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var angularx_social_login_1 = require("angularx-social-login");
var angularx_social_login_2 = require("angularx-social-login");
var search_results_component_1 = require("./shared/search-results/search-results.component");
var footer_component_1 = require("./shared/footer/footer.component");
// import { DateAgoPipe } from './shared/pipes/date-ago.pipe';
// import { RootComponent } from './tree/root/root.component';
// import { BreadcrumbsComponent} from './tree/breadcrumbs/breadcrumbs.component'
// var routes = [
//   { path: "", component: ArticleListComponent },
//   {
//     path: "auth",
//     loadChildren: () => 
//       import('././auth/auth.module').then(m => m.AuthModule)
//   },
//   { path: "**", component: NotFoundComponent },
//   { path: "blogs", component: BlogsComponent }
// ]
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                not_found_component_1.NotFoundComponent,
                header_component_1.HeaderComponent,
                search_results_component_1.SearchResultsComponent,
                footer_component_1.FooterComponent,
            ],
            imports: [
                flex_layout_1.FlexLayoutModule,
                platform_browser_1.BrowserModule,
                material_module_1.MaterialModule,
                app_routing_module_1.AppRoutingModule,
                // RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules }),
                landing_module_1.LandingModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpClientModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                forms_2.ReactiveFormsModule,
                angularx_social_login_1.SocialLoginModule,
            ],
            providers: [
                realtimelogger_service_1.LoggerService,
                auth_service_1.AuthService,
                knowledge_service_1.DataService,
                urlconfig_service_1.UrlconfigService,
                {
                    provide: 'SocialAuthServiceConfig',
                    useValue: {
                        autoLogin: false,
                        providers: [
                            {
                                id: angularx_social_login_2.FacebookLoginProvider.PROVIDER_ID,
                                provider: new angularx_social_login_2.FacebookLoginProvider('300909670932138')
                            },
                        ]
                    }
                }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
