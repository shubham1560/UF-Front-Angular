"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FooterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FooterComponent = /** @class */ (function () {
    function FooterComponent(fb, route, loggerService) {
        this.fb = fb;
        this.route = route;
        this.loggerService = loggerService;
        this.showFooter = true;
    }
    FooterComponent.prototype.ngOnInit = function () {
        var _this = this;
        // setTimeout(()=>{
        //   this.showFooter = false;
        // }, 3000)
        this.route.paramMap.subscribe(function (params) {
            // console.log("changed");
            // console.log(_this.route.paramMap);
        });
        this.subscribeForm = this.fb.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.minLength(1), forms_1.Validators.email]]
        });
        // this.loggerService.logData("uf-footer", this);
    };
    FooterComponent.prototype.subscribeViaMail = function () {
        // console.log( this.subscribeForm.get("email").value);
        //make the service to send it to the mailing list
    };
    FooterComponent = __decorate([
        core_1.Component({
            selector: 'app-footer',
            templateUrl: './footer.component.html',
            styleUrls: ['./footer.component.scss']
        })
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;
