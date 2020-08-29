"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LandingModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var landing_component_1 = require("./landing.component");
var all_articles_component_1 = require("./all-articles/all-articles.component");
var landing_routing_module_1 = require("./landing-routing.module");
var material_module_1 = require("../shared/material.module");
var realtimelogger_service_1 = require("../services/cx-menu/realtimelogger.service");
var auth_service_1 = require("../services/authservice/auth.service");
var knowledge_service_1 = require("../services/knowledgeservice/knowledge.service");
var flex_layout_1 = require("@angular/flex-layout");
var ngx_infinite_scroll_1 = require("ngx-infinite-scroll");
var featured_component_1 = require("./featured/featured.component");
var exploreroots_component_1 = require("./exploreroots/exploreroots.component");
var read_articles_component_1 = require("./read-articles/read-articles.component");
var recently_viewed_component_1 = require("./recently-viewed/recently-viewed.component");
var date_ago_pipe_1 = require("../shared/pipes/date-ago.pipe");
var LandingModule = /** @class */ (function () {
    function LandingModule() {
    }
    LandingModule = __decorate([
        core_1.NgModule({
            declarations: [landing_component_1.LandingComponent,
                all_articles_component_1.AllArticlesComponent,
                featured_component_1.FeaturedComponent,
                exploreroots_component_1.ExplorerootsComponent,
                read_articles_component_1.ReadArticlesComponent,
                recently_viewed_component_1.RecentlyViewedComponent,
                date_ago_pipe_1.DateAgoPipe,
            ],
            imports: [
                common_1.CommonModule,
                landing_routing_module_1.LandingRoutingModule,
                material_module_1.MaterialModule,
                flex_layout_1.FlexLayoutModule,
                ngx_infinite_scroll_1.InfiniteScrollModule,
            ],
            exports: [landing_component_1.LandingComponent, all_articles_component_1.AllArticlesComponent,],
            providers: [realtimelogger_service_1.LoggerService, auth_service_1.AuthService, knowledge_service_1.DataService],
            bootstrap: [landing_component_1.LandingComponent]
        })
    ], LandingModule);
    return LandingModule;
}());
exports.LandingModule = LandingModule;
