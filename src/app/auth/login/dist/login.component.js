"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var angularx_social_login_1 = require("angularx-social-login");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, authService, cookieService, loggerService, socialService) {
        this.fb = fb;
        this.authService = authService;
        this.cookieService = cookieService;
        this.loggerService = loggerService;
        this.socialService = socialService;
        // Form logic
        this.hide = true;
        this.signingIn = false;
        this.signInFailure = false;
    }
    LoginComponent.prototype.signInWithFB = function () {
        this.signingIn = true;
        this.socialService.signIn(angularx_social_login_1.FacebookLoginProvider.PROVIDER_ID);
    };
    LoginComponent.prototype.signInWithGoogle = function () {
        this.signingIn = true;
    };
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.socialService.authState.subscribe(function (user) {
            var access_token = user.authToken;
            _this.authService.login_facebook(access_token).subscribe(function (result) {
                _this.cookieService.set('token', result.token);
                localStorage.setItem('token', result.token);
                if (localStorage.getItem("redirect_url")) {
                    window.location.href = localStorage.getItem("redirect_url");
                    window.location.reload();
                }
                else {
                    window.location.href = "welcome";
                }
                _this.signingIn = false;
            }, function (error) {
                _this.signingIn = false;
                _this.errorMessage = "Some problem with your facebook account!";
            });
            // this.loggedIn = (user != null);
        });
        this.isLoggedIn = this.authService.isLoggedIn();
        if (!this.isLoggedIn) {
            this.loginForm = this.fb.group({
                email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
                password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(8)]]
            });
            // this.testData();
        }
        this.loggerService.logData("auth-login", this);
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (!this.isLoggedIn) {
            this.signingIn = true;
            this.authService.login_root(this.loginForm.value["email"], this.loginForm.value["password"]).subscribe(function (response) {
                _this.response = response;
                _this.signingIn = false;
                _this.cookieService.set('token', response.token);
                localStorage.setItem('token', response.token);
                if (localStorage.getItem("redirect_url")) {
                    window.location.href = localStorage.getItem("redirect_url");
                    window.location.reload();
                    window.location.href = "welcome";
                }
            }, function (error) {
                _this.errorMessage = error.error.message;
                _this.error = error;
                _this.signInFailure = true;
                _this.signingIn = false;
            });
        }
    };
    LoginComponent.prototype.googleInit = function () {
        var _this = this;
        gapi.load('auth2', function () {
            _this.auth2 = gapi.auth2.init({
                client_id: '858132682646-5tacv1knc5ujr15omjrhcm4gnv49mat7.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });
            _this.attachSignin(document.getElementById('googleBtn'));
        });
    };
    LoginComponent.prototype.attachSignin = function (element) {
        var _this = this;
        this.auth2.attachClickHandler(element, {}, function (googleUser) {
            _this.signingIn = true;
            var access_token = googleUser.getAuthResponse().access_token;
            _this.authService.login_google(access_token).subscribe(function (response) {
                _this.cookieService.set('token', response.token);
                localStorage.setItem('token', response.token);
                // this.router.navigate(['/welcome']);
                if (localStorage.getItem("redirect_url")) {
                    window.location.href = localStorage.getItem("redirect_url");
                    window.location.reload();
                }
                else {
                    window.location.href = "welcome";
                }
                _this.signingIn = false;
            }, function (error) {
                _this.signingIn = false;
                _this.errorMessage = "Some Problem with your google account!";
            });
            //YOUR CODE HERE
        }, function (error) {
            alert(JSON.stringify(error, undefined, 2));
        });
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        this.googleInit();
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
