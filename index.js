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
exports.__esModule = true;
var fs = require("fs/promises");
var csv_stringify_1 = require("csv-stringify");
var sync_1 = require("csv-parse/sync");
var order_prices_1 = require("./order_prices");
var product_customers_1 = require("./product_customers");
var customer_ranking_1 = require("./customer_ranking");
var saveCSV = function (arrayOfObjects, outFilename, columns) {
    if (columns === void 0) { columns = null; }
    (0, csv_stringify_1.stringify)(arrayOfObjects, { header: true, columns: columns }, function (error, output) {
        fs.writeFile(outFilename, output, 'utf-8');
        console.log("".concat(outFilename, " saved"));
    });
};
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var ordersRaw, productsRaw, customersRaw, orders, products, customers, orderPrices, productCustomers, customerRanking, orderPricesColumns;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fs.readFile('orders.csv', 'binary')];
            case 1:
                ordersRaw = _a.sent();
                return [4 /*yield*/, fs.readFile('products.csv', 'binary')];
            case 2:
                productsRaw = _a.sent();
                return [4 /*yield*/, fs.readFile('customers.csv', 'binary')];
            case 3:
                customersRaw = _a.sent();
                orders = (0, sync_1.parse)(ordersRaw, { columns: true });
                products = (0, sync_1.parse)(productsRaw, { columns: true });
                customers = (0, sync_1.parse)(customersRaw, { columns: true });
                orderPrices = (0, order_prices_1["default"])(orders, products);
                productCustomers = (0, product_customers_1["default"])(products, orders);
                customerRanking = (0, customer_ranking_1["default"])(orderPrices, customers);
                orderPricesColumns = {
                    id: 'id',
                    euros: 'euros'
                };
                saveCSV(orderPrices, 'order_prices.csv', orderPricesColumns);
                saveCSV(productCustomers, 'product_customers.csv');
                saveCSV(customerRanking, 'customer_ranking.csv');
                return [2 /*return*/];
        }
    });
}); };
main();
exports["default"] = main;
