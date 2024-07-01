"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseDates = (req, res, next) => {
    try {
        if (req.body.start_date) {
            req.body.start_date = new Date(req.body.start_date);
        }
        if (req.body.end_date) {
            req.body.end_date = new Date(req.body.end_date);
        }
        if (req.body.dob) {
            req.body.dob = new Date(req.body.dob);
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = parseDates;
