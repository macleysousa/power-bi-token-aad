"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerBI = void 0;
var events_1 = require("events");
var path = __importStar(require("path"));
var puppeteer_1 = __importDefault(require("puppeteer"));
var PowerBI = /** @class */ (function (_super) {
    __extends(PowerBI, _super);
    function PowerBI(options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        _this = _super.call(this) || this;
        _this.options = options;
        _this.headless = (_b = (_a = _this.options) === null || _a === void 0 ? void 0 : _a.headless) !== null && _b !== void 0 ? _b : true;
        _this.userDataDir = (_d = (_c = _this.options) === null || _c === void 0 ? void 0 : _c.userDataDir) !== null && _d !== void 0 ? _d : './.power-bi';
        _this.clientName = (_f = (_e = _this.options) === null || _e === void 0 ? void 0 : _e.clientName) !== null && _f !== void 0 ? _f : 'client';
        _this.isAuthenticated = false;
        return _this;
    }
    PowerBI.prototype.init = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, _d, hasPowerBITeamsAppInstallationInfo;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _c = this;
                        return [4 /*yield*/, puppeteer_1.default.launch({ headless: this.headless, userDataDir: path.resolve(this.userDataDir + '\\' + "".concat((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.clientName) !== null && _b !== void 0 ? _b : 'client')) })];
                    case 1:
                        _c.browser = _e.sent();
                        _d = this;
                        return [4 /*yield*/, this.browser.pages()];
                    case 2:
                        _d.client = (_e.sent())[0];
                        return [4 /*yield*/, this.client.goto('https://app.powerbi.com/')];
                    case 3:
                        _e.sent();
                        return [4 /*yield*/, this.client.waitForTimeout(1000 * 2)];
                    case 4:
                        _e.sent();
                        return [4 /*yield*/, this.client.evaluate(function () {
                                return localStorage.getItem('PowerBITeamsAppInstallationInfo') !== null;
                            })];
                    case 5:
                        hasPowerBITeamsAppInstallationInfo = _e.sent();
                        if (!hasPowerBITeamsAppInstallationInfo) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getAccessToken()];
                    case 6:
                        _e.sent();
                        _e.label = 7;
                    case 7:
                        this.emit('ready', undefined);
                        return [2 /*return*/, this];
                }
            });
        });
    };
    PowerBI.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var powerBIAccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('Session not initialized');
                        }
                        return [4 /*yield*/, this.client.reload()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.waitForTimeout(1000 * 2)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.evaluate(function () {
                                return { accessToken: eval("powerBIAccessToken"), expiresOn: eval("powerBIAccessTokenExpiry") };
                            }).then(function (data) { return data; }).catch(function () { return undefined; })];
                    case 3:
                        powerBIAccess = _a.sent();
                        if (powerBIAccess) {
                            this.isAuthenticated = true;
                            this.emit('authenticated', powerBIAccess);
                        }
                        return [2 /*return*/, powerBIAccess];
                }
            });
        });
    };
    PowerBI.prototype.login = function (email, password, auth2) {
        return __awaiter(this, void 0, void 0, function () {
            var page, hasAuth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('Session not initialized');
                        }
                        page = this.client;
                        page.goto('https://app.powerbi.com/singleSignOn?ru=https%3A%2F%2Fapp.powerbi.com%2F%3FnoSignUpCheck%3D1');
                        return [4 /*yield*/, page.waitForTimeout(1000 * 2)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getAccessToken()];
                    case 2:
                        hasAuth = _a.sent();
                        if (!!hasAuth) return [3 /*break*/, 22];
                        return [4 /*yield*/, page.waitForSelector('input#email', { visible: true })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.type('input#email', email)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector('button#submitBtn', { visible: true })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, page.click('button#submitBtn')];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, page.waitForNavigation()];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector('input[type="password"]', { visible: true })];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, page.type('input[type="password"]', password)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector('input[type="submit"]', { visible: true })];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, page.click('input[type="submit"]')];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, page.waitForNavigation()];
                    case 12:
                        _a.sent();
                        if (!auth2) return [3 /*break*/, 18];
                        return [4 /*yield*/, page.waitForSelector('input[type="tel"]', { visible: true })];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, page.type('input[type="tel"]', auth2)];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector('input[type="submit"]', { visible: true })];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, page.click('input[type="submit"]')];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, page.waitForNavigation()];
                    case 17:
                        _a.sent();
                        _a.label = 18;
                    case 18: return [4 /*yield*/, page.goto('https://app.powerbi.com/')];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, page.waitForTimeout(1000)];
                    case 20:
                        _a.sent();
                        return [4 /*yield*/, this.getAccessToken()];
                    case 21:
                        _a.sent();
                        _a.label = 22;
                    case 22: return [2 /*return*/];
                }
            });
        });
    };
    PowerBI.prototype.on = function (eventName, listener) {
        return _super.prototype.on.call(this, eventName, listener);
    };
    PowerBI.prototype.close = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, ((_a = this.client) === null || _a === void 0 ? void 0 : _a.close())];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, ((_b = this.browser) === null || _b === void 0 ? void 0 : _b.close())];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return PowerBI;
}(events_1.EventEmitter));
exports.PowerBI = PowerBI;
