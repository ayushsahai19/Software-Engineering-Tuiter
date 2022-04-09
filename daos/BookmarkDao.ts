/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
 import BookmarkDaoI from "../interfaces/BookmarkDaoI";
 import Bookmark from "../models/bookmarks/Bookmark";
 import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
 
 /**
  * @class BookmarkDao Implements Data Access Object managing 
  * of bookmarks
  * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
  */
 export default class BookmarkDao implements BookmarkDaoI{
     public static bookmarkDao: BookmarkDao | null = null
     /**
      * Creates singleton DAO instance
      * @returns BookmarkDao
      */
     public static getInstance = (): BookmarkDao => {
         if (BookmarkDao.bookmarkDao === null) {
             BookmarkDao.bookmarkDao = new BookmarkDao();
         }
         return BookmarkDao.bookmarkDao;
     }
     private constructor() {}
      
     /**
      * Creates a bookmark instance in the database
      * @param {string} uid user's primary key
      * @param {string} tid tuit's primary key
      * @returns Promise to be notified when the tuit is bookmarked in
      * database
      */
     bookmarkTuit = async (tid: string, uid: string): Promise<Bookmark> =>
         BookmarkModel.create({bookmarkedTuit: tid, bookmarkedBy: uid});
 
     /**
      * Creates an un-bookmark instance in the database
      * @param {string} uid user's primary key
      * @param {string} tid tuit's primary key
      * @returns Promise to be notified when the tuit is un-bookmarked in
      * database
      */
     unBookmarkTuit = async (tid: string, uid: string): Promise<any> =>
         BookmarkModel.deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid});
 
 
     /**
      * BookmarkModel to retrieve all the bookmarked tuits by a given user
      * from bookmark collection
      * @param {string} uid user's primary key
      * @returns Promise to be notified when tuits are retrieved from the database
      */
     viewAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
         BookmarkModel.find({bookmarkedBy: uid});
 
}