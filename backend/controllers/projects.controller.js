import errorHandler from "../utils/custom.error.handler.js";
import Project from "../models/project.model.js";
import { generateBlurHashFromImageUrl } from "../utils/imagesFunctions.js"
export const getProjects = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || null;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const projects = await Project.find({}).sort({ createdAt: -1 }).limit(limit)
      .skip(startIndex);
    if (projects.length == 0) {
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
    if (req.admin && req.admin.id != req.params.adminId) {
      return next(errorHandler(401, "You can only create projects from your own account!"));
    }
    const { imageUrl } = req.body;
    const imageBlur = await generateBlurHashFromImageUrl(imageUrl);

    const project = await Project.create({
      ...req.body,
      blurhash: imageBlur

    });
    return res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};


export const editProject = async (req, res, next) => {
  if (req.admin && req.admin.id != req.params.adminId) {
    return next(errorHandler(401, "You can only create projects from your own account!"));
  }
  const project = await Project.findById(req.params.id);
  if (!project) {
    return next(errorHandler(404, "Project not found!"));
  }
  try {
    const { imageUrl } = req.body;
    const imageBlur = await generateBlurHashFromImageUrl(imageUrl);
    const updatedproject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        blurhash: imageBlur
  
      },
      { new: true }
    );
    res.status(200).json(updatedproject);
  } catch (error) {
    next(error);
  }
};


export const deleteProject = async (req, res, next) => {
  if (req.admin && req.admin.id != req.params.adminId) {
    return next(errorHandler(401, "You can only delete projects from your own account!"));
  }
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


