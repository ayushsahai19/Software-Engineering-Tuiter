import MediaDaoI from "../interfaces/MediaDaoI";
import Tuit from "../models/tuits/Tuit";
import TuitModel from "../mongoose/tuits/TuitModel";
export default class MediaDao implements MediaDaoI {

    private static mediaDao: MediaDao | null = null;

    public static getInstance = (): MediaDao => {
        if (MediaDao.mediaDao === null) {
            MediaDao.mediaDao = new MediaDao();
        }
        return MediaDao.mediaDao;
    }

    private constructor() {
    }

    findAllTuitsWithMedia = async(uid: string): Promise<Tuit[]> =>
        TuitModel
            .find({postedBy: uid, image: { $exists: true, $ne: null }})
            .sort({'postedOn': -1})
            .populate("postedBy")
            .exec();

}