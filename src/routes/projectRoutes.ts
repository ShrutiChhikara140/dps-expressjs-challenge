import { Router } from 'express';
import {
	createProject,
	getAllProjects,
	getProjectById,
	updateProjectById,
	deleteProjectById,
	createReportForProject,
	getReportsForProject,
} from '../controllers/projectController';

const router = Router();

router.post('/projects', createProject);
router.get('/projects', getAllProjects);
router.get('/projects/:id', getProjectById);
router.put('/projects/:id', updateProjectById);
router.delete('/projects/:id', deleteProjectById);
router.post('/projects/:projectid/reports', createReportForProject);
router.get('/projects/:projectid/reports', getReportsForProject);

export default router;
