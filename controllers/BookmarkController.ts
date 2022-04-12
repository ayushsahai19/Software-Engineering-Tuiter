/**
 * @file Controller RESTful Web service API for bookmark resource
 */
 import {Express, Request, Response} from "express";

 import BookmarkDao from "../daos/BookmarkDao";
 import BookmarkControllerI from "../interfaces/BookmarkControllerI";
 import Bookmark from "../models/bookmarks/Bookmark";
 import TuitDao from "../daos/TuitDao";

 
 /**
  * @class BookmarkController Implements RESTful Web service API for bookmark resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/bookmark/:tid/:uid to bookmark a tuit
  *     </li>
  *     <li>DELETE /api/        :uid to unbookmark a tuit
  *     </li>
  *     <li>GET /api/bookmark/tuit/:uid to fetch all the tuits bookmarked by a user
  *     </li>
  * </ul>
  * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
  * @property {BookmarkController} bookmarkController Singleton controller implementing
  * RESTful Web service API
  */
 
 export default class BookmarkController implements BookmarkControllerI {
     
     private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance()
     private static bookmarkController: BookmarkController | null = null;
     private static tuitDao: TuitDao = TuitDao.getInstance();
 
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return BookmarkController
      */
 
     public static getInstance = (app: Express): BookmarkController => {
         if (BookmarkController.bookmarkController === null) {
             BookmarkController.bookmarkController = new BookmarkController();
             app.put("/api/bookmark/:tid/:uid", BookmarkController.bookmarkController.bookmarkTuit);
            app.delete("/api/unbookmark/:tid/:uid", BookmarkController.bookmarkController.unBookmarkTuit);
            app.get("/api/bookmark/tuit/:uid", BookmarkController.bookmarkController.viewAllTuitsBookmarkedByUser);
            
            }
         return BookmarkController.bookmarkController;
     }
 
     /**
      * Bookmarks a tuit
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays
      */
      
     bookmarkTuit = async (req: Request, res: Response) => {
             const uid = req.params.uid;
             const tid = req.params.tid;
             const tuitDao = BookmarkController.tuitDao;
             // @ts-ignore
             const profile = req.session['profile'];
             const userId = uid === "me" && profile ?
                 profile._id : uid;

             const bookmarkDao = BookmarkController.bookmarkDao;
             let tuit = await tuitDao.findTuitById(tid);
             const userAlreadyBookmarkedTuit = await bookmarkDao.findUserBookmarksTuit(userId, tid);
             try {
                 if(userAlreadyBookmarkedTuit) {
                     await bookmarkDao.userBookmarkesTuit(userId,tid);
                 }
                 else {
                await bookmarkDao.bookmarkTuit(tid, userId);
                 }
                res.sendStatus(200);
             } catch (e) {
                 res.sendStatus(404);
             }


     }
 
     /**
      * Unbookmarks a tuit
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays
      */
     unBookmarkTuit = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
            try {
         BookmarkController.bookmarkDao.unBookmarkTuit(req.params.tid, userId)
             res.sendStatus(200)
            }
            catch (e) {
                res.sendStatus(404);
            }
     }
     
 
     /**
      * Retrieves all bookmarked tuits by a user
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays
      */
     viewAllTuitsBookmarkedByUser = (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
                BookmarkController.bookmarkDao.viewAllTuitsBookmarkedByUser(userId)
                .then(bookmark => {
                    const likesNonNullTuits = bookmark.filter(bookmark => bookmark.tuit);
                    const tuitsFromBookmark = likesNonNullTuits.map(bookmark => bookmark.tuit);
                    res.json(tuitsFromBookmark);
                });
   

         
     }
 
    
 }