import errorHandler from "../utils/custom.error.handler.js";
import Project from "../models/project.model.js";

export const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({});
        if (!projects) {
            return next(errorHandler(404, "No projects found!"));
        }
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
    
}


export const getProjectById = async (req, res, next) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return next(errorHandler(404, "Project not found!"));
      }
  
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  };

export const createProject = async (req, res, next) => {
    try {
      const project = await Project.create(req.body);
      return res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  };


  export const editProject = async (req, res, next) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return next(errorHandler(404, "Project not found!"));
    }
    try {
      const updatedproject = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedproject);
    } catch (error) {
      next(error);
    }
  };


  export const deleteProject = async (req, res, next) => {
    const proj = await Project.findById(req.params.id);
  
    if (!proj) {
      return next(errorHandler(404, "Project not found!"));
    }
    try {
      await Project.findByIdAndDelete(req.params.id);
      res.status(200).json("Project has been deleted!");
    } catch (error) {
      next(error);
    }
  };