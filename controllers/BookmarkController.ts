/**
 * @file Controller RESTful Web service API for bookmark resource
 */
 import {Express, Request, Response} from "express";
 import { ParamsDictionary } from "express-serve-static-core";
 import { ParsedQs } from "qs";
 import BookmarkDao from "../daos/BookmarkDao";
 import BookmarkControllerI from "../interfaces/BookmarkControllerI";
 import Bookmark from "../models/bookmarks/Bookmark";
 
 /**
  * @class BookmarkController Implements RESTful Web service API for bookmark resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/bookmark/:tid/:uid to bookmark a tuit
  *     </li>
  *     <li>DELETE /api/unbookmark/:tid/:uid to unbookmark a tuit
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
 
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return BookmarkController
      */
 
     public static getInstance = (app: Express): BookmarkController => {
         if (BookmarkController.bookmarkController === null) {
             BookmarkController.bookmarkController = new BookmarkController();
             app.post("/api/bookmark/:tid/:uid", BookmarkController.bookmarkController.bookmarkTuit);
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
 
     bookmarkTuit = (req: Request, res: Response) =>
         BookmarkController.bookmarkDao.bookmarkTuit(req.params.tid, req.params.uid)
             .then((book) => res.json(book));
 
     /**
      * Unbookmarks a tuit
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays
      */
     unBookmarkTuit = (req: Request, res: Response) =>
         BookmarkController.bookmarkDao.unBookmarkTuit(req.params.tid, req.params.uid)
             .then((unbook) => res.json(unbook));
 
     
 
     /**
      * Retrieves all bookmarked tuits by a user
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays
      */
     viewAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
         BookmarkController.bookmarkDao.viewAllTuitsBookmarkedByUser(req.params.uid)
             .then((tuit) => res.json(tuit));
 
    
 }