import { Router } from 'express';
import {
	getAllReports,
	getReportById,
	updateReportById,
	deleteReportById,
	getSpecialReports,
} from '../controllers/reportController';

const router = Router();

router.get('/reports', getAllReports);
router.get('/reports/:id', getReportById);
router.put('/reports/:id', updateReportById);
router.delete('/reports/:id', deleteReportById);
router.get('/special-reports', getSpecialReports);

export default router;
