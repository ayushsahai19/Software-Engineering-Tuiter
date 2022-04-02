import Dislike from "../models/dislikes/Dislike";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface DislikeDaoI {
    findAllUsersThatDislikedTuit(tid: string): Promise<Dislike[]>;
    findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]>;
    userDislikesTuit(uid: string, tid: string): Promise<any>;

    findUserDislikesTuit(uid: string, tid: string): Promise<any>;
    userRemovesUnlikeTuit(uid: string, tid: string): Promise<any>;
    countHowManyLikedTuit (tid: string): Promise<any>;
};