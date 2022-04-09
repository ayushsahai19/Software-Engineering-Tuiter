/**
 * @file implements the interface for Bookmark controller
 */
import {Request, Response} from "express";
export default interface BookmarkControllerI {
    bookmarkTuit(req: Request, res: Response): void;
    unBookmarkTuit(req: Request, res: Response): void;
    viewAllTuitsBookmarkedByUser(req: Request, res: Response): void;
}