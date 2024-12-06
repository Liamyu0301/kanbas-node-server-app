// import * as assignmentsDao from "./dao.js";

// export default function AssignmentRoutes(app) {
//   app.delete("/api/assignments/:assignmentId", (req, res) => {
//     const { assignmentId } = req.params;
//     const status = assignmentsDao.deleteAssignment(assignmentId);
//     res.sendStatus(204);
//   });

//   // Update an assignment
//   app.put("/api/assignments/:course/assignments/:assignmentId", (req, res) => {
//     const { assignmentId } = req.params;
//     const assignmentUpdates = req.body;
//     const updatedAssignment = assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
//     if (updatedAssignment) {
//       res.status(200).json(updatedAssignment);
//     } else {
//       res.status(404).send({ error: "Assignment not found" });
//     }
//   });
// }

import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = await assignmentsDao.createAssignment(assignment); 
    res.json(newAssignment);
  });

  app.put("/api/courses/:courseId/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const updateResult = await assignmentsDao.updateAssignment(assignmentId, assignmentUpdates); 
    if (updateResult.modifiedCount > 0) {
      res.status(200).json({ status: "ok" });
    } else {
      res.status(404).send({ error: "Assignment not found" });
    }
  });

  app.delete("/api/courses/:courseId/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    await assignmentsDao.deleteAssignment(assignmentId); // 修改：await
    res.sendStatus(204);
  });
}