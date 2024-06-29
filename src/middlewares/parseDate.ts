import express, { Request, Response, NextFunction } from 'express';

const parseDates = (req: Request, res: Response, next: NextFunction) => {
    try{
        if (req.body.start_date) {
            req.body.start_date = new Date(req.body.start_date);
        }
        if (req.body.end_date) {
            req.body.end_date = new Date(req.body.end_date);
        }
        if (req.body.dob){
            req.body.dob = new Date(req.body.dob);
        }
        next();
    }catch(error){
        next(error);
    }
};

export default parseDates;