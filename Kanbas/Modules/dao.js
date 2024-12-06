import model from "./model.js";

export function updateModule(moduleId, moduleUpdates) {
  return model.updateOne({ _id: moduleId }, moduleUpdates);
}

  
export function deleteModule(moduleId) {
  return model.deleteOne({ _id: moduleId });
 // const { modules } = Database;
 // Database.modules = modules.filter((module) => module._id !== moduleId);
}


export function createModule(module) {
  delete module._id
  updateModule(module._id, module);
  return model.create(module);
  // const newModule = { ...module, _id: Date.now().toString() };
  // Database.modules = [...Database.modules, newModule];
  // return newModule;
}

export function findModulesForCourse(courseId) {
  return model.find({ course: courseId });
}