import {Request, Response} from "express";

export default interface MediaControllerI {
    findAllTuitsWithMedia (req: Request, res: Response): void;
};