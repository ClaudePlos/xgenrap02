"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutingModule = void 0;
var router_1 = require("@angular/router");
var home_1 = require("./home");
var login_1 = require("./login");
var register_1 = require("./register");
var _helpers_1 = require("./_helpers");
var sqladmin_1 = require("./sqladmin");
var reports_1 = require("./reports");
var routes = [
    { path: '', component: home_1.HomeComponent, canActivate: [_helpers_1.AuthGuard] },
    { path: 'login', component: login_1.LoginComponent },
    { path: 'register', component: register_1.RegisterComponent },
    { path: 'sqladmin', component: sqladmin_1.SqladminComponent },
    { path: 'reports', component: reports_1.ReportsComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.appRoutingModule = router_1.RouterModule.forRoot(routes);
