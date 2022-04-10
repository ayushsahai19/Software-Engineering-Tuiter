import Tuit from "../models/tuits/Tuit";

export default interface MediaDaoI {
    findAllTuitsWithMedia (uid: string): Promise<Tuit[]>
}