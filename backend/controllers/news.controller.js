import errorHandler from "../utils/custom.error.handler.js";
import News from "../models/news.model.js";

export const getNews = async (req, res, next) => {
    try {
        const news = await News.find({});
        if (news.length == 0) {
            return next(errorHandler(404, "No news found!"));
        }
        res.status(200).json(news);
    } catch (error) {
        next(error);
    }
    
}


export const getNewsById = async (req, res, next) => {
    try {
      const news = await News.findById(req.params.id);
      if (!news) {
        return next(errorHandler(404, "Event not found!"));
      }
  
      res.status(200).json(news);
    } catch (error) {
      next(error);
    }
  };

export const createNews = async (req, res, next) => {
    try {
      if (req.admin && req.admin.id != req.params.adminId) {
        return next(errorHandler(401, "You can only create projects from your own account!"));
      }
      const news = await News.create(req.body);
      return res.status(201).json(news);
    } catch (error) {
      next(error);
    }
  };


  export const editNews = async (req, res, next) => {
    if (req.admin && req.admin.id != req.params.adminId) {
      return next(errorHandler(401, "You can only create projects from your own account!"));
    }
    const news = await News.findById(req.params.id);
    if (!news) {
      return next(errorHandler(404, "News not found!"));
    }
    try {
      const updatedNews = await News.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedNews);
    } catch (error) {
      next(error);
    }
  };


  export const deleteNews = async (req, res, next) => {
    if (req.admin && req.admin.id != req.params.adminId) {
      return next(errorHandler(401, "You can only create projects from your own account!"));
    }
    const news = await News.findById(req.params.id);
  
    if (!news) {
      return next(errorHandler(404, "Event not found!"));
    }
    try {
      await News.findByIdAndDelete(req.params.id);
      res.status(200).json("Event has been deleted!");
    } catch (error) {
      next(error);
    }
  };