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
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ensure the request data has the expected structure
        const requestData = {
            body: req.body || {},
            query: req.query || {},
            params: req.params || {},
        };
        yield schema.parseAsync(requestData);
        return next();
    }
    catch (err) {
        const errorMessage = JSON.parse(err.message);
        return res.status(400).json({
            status: "Bad Request!",
            message: errorMessage,
        });
    }
});
exports.default = validate;
