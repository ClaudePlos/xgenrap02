"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
var oracledb = require('oracledb');
var configDB = require('./dbConfig.ts');
var http_1 = require("@angular/common/http");
var conn;
var users;
try {
    oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_11_2' });
}
catch (err) {
    console.error('Whoops!');
    console.error(err);
    process.exit(1);
}
function runConnect() {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 10]);
                    console.log('Connect: ');
                    return [4 /*yield*/, oracledb.getConnection(configDB)];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.execute('select \'select to DB\' from dual')];
                case 2:
                    result = _a.sent();
                    return [4 /*yield*/, conn.execute('select id_operator id, kod username, haslo password from operatorzy', [], { outFormat: oracledb.OUT_FORMAT_OBJECT })];
                case 3:
                    users = _a.sent();
                    console.log('(ks)>Connection with DB test: ');
                    console.log(result);
                    return [3 /*break*/, 10];
                case 4:
                    err_1 = _a.sent();
                    console.log('(ks)>Error:Connection with DB test: ');
                    console.error(err_1);
                    return [3 /*break*/, 10];
                case 5:
                    if (!conn) return [3 /*break*/, 9];
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, conn.close()];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    err_2 = _a.sent();
                    console.error(err_2);
                    return [3 /*break*/, 9];
                case 9: return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
runConnect();
function getTime() {
    return __awaiter(this, void 0, void 0, function () {
        var err_3, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 9]);
                    return [4 /*yield*/, oracledb.getConnection(configDB)];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.execute('select current_timestamp from dual')];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_3 = _a.sent();
                    console.error(err_3);
                    return [3 /*break*/, 9];
                case 4:
                    if (!conn) return [3 /*break*/, 8];
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, conn.close()];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_4 = _a.sent();
                    console.error(err_4);
                    return [3 /*break*/, 8];
                case 8: return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
// Allow any method from any host and log requests
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    console.log(req.method);
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }
    else {
        console.log(req.ip + " " + req.method + " " + req.url);
        next();
    }
});
// Handle POST requests that come in formatted as JSON
app.use(express.json());
/**app.use('/', routers);*/
app.get('/', function (req, res) { res.send([{ message: 'http://localhost:4201/ >> OK' }]); });
app.get('/users', function (req, res) {
    console.log('Loguje się: ' + req.query.username);
    res.send([users.rows.find(function (x) { return x.USERNAME === req.query.username; })]);
});
app.post('/users', function (req, res) {
    console.log(req.body);
    res.send({ body: req.body });
});
//app.get('/users/authenticate', (req: any, res: any) => { res.send([{username: 'test', password: 'test'}])});
app.post('/users/authenticat2', function (req, res) {
    console.log('Test');
    //console.log(req.body);
    //res.send({id: '123', username: 'dupa', password: 'dupa', lastName: 'dupaLast'});
    res.send(new http_1.HttpResponse({ status: 200, body: req.body }));
});
app.get('/time', function (req, res) {
    var currentTime = getTime();
    currentTime.then(function (value) {
        console.log(value.rows);
        res.send([{ time: value.rows[0] + ' >>> Get Time form ataBase OK' }]);
    });
});
app.listen(4201, '127.0.0.1', function () {
    console.log('Server now listening on 4201');
});
