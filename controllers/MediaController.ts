import MediaControllerI from "../interfaces/MediaControllerI";
import MediaDao from "../daos/MediaDao";
import {Express, Request, Response} from "express";
import Tuit from "../models/tuits/Tuit";

export default class MediaController implements MediaControllerI {
    private static mediaDao: MediaDao = MediaDao.getInstance();
    private static mediaController: MediaController | null = null;

    public static getInstance = (app: Express): MediaController => {
        if (MediaController.mediaController === null) {
            MediaController.mediaController = new MediaController();
            app.get("/api/users/:uid/tuitmedia", MediaController.mediaController.findAllTuitsWithMedia);
        }
        return MediaController.mediaController;
    }

    private constructor() {
    }

    findAllTuitsWithMedia = (req: Request, res: Response) => {
        // @ts-ignore
        let userId = req.params.uid === "my" && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id : req.params.uid;
        if (userId === "my") {
            res.sendStatus(503);
            return;
        }
        MediaController.mediaDao.findAllTuitsWithMedia(userId)
            .then((tuits: Tuit[]) => res.json(tuits))
    }
}