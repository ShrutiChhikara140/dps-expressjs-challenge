import { Request, Response } from 'express';
import dbService from '../services/db.service';

export const getAllReports = (req: Request, res: Response) => {
	const reports = dbService.query(
		'SELECT id, projectid, text FROM reports',
	) as { id: string; projectid: string; text: string }[];
	res.json(reports);
};

export const getReportById = (req: Request, res: Response) => {
	const { id } = req.params;

	const report = dbService.query(
		'SELECT id, projectid, text FROM reports WHERE id = ?',
		[id],
	) as { id: number; projectid: number; text: string }[];

	if (report.length === 0) {
		res.status(404).send('Report not found');
	} else {
		res.json(report[0]);
	}
};

export const updateReportById = (req: Request, res: Response) => {
	const { id } = req.params;
	const { text } = req.body;

	// Validate request parameters and body
	if (!id) {
		return res.status(400).json({ error: 'Report ID is required.' });
	}

	if (!text) {
		return res.status(400).json({ error: 'Text is required.' });
	}

	try {
		const result = dbService.run(
			'UPDATE reports SET text = ? WHERE id = ?',
			[text, id],
		);

		// Check if the update operation affected any rows
		if (result.changes > 0) {
			console.log(`Report with ID ${id} has been updated.`);
			res.status(200).json({
				message: `Report with ID ${id} has been successfully updated.`,
			});
		} else {
			console.log(`No report found with ID ${id}.`);
			res.status(404).json({ error: `No report found with ID ${id}.` });
		}
	} catch (error) {
		console.error('Error updating report:', error);
		res.status(500).json({ error: 'Error updating report.' });
	}
};

export const deleteReportById = (req: Request, res: Response) => {
	const { id } = req.params;

	// Validate request parameters
	if (!id) {
		return res.status(400).json({ error: 'Report ID is required.' });
	}

	try {
		const result = dbService.run('DELETE FROM reports WHERE id = ?', [id]);

		// Check if the delete operation affected any rows
		if (result.changes > 0) {
			console.log(`Report with ID ${id} has been deleted.`);
			res.status(200).json({
				message: `Report with ID ${id} has been successfully deleted.`,
			});
		} else {
			console.log(`No report found with ID ${id}.`);
			res.status(404).json({ error: `No report found with ID ${id}.` });
		}
	} catch (error) {
		console.error('Error deleting report:', error);
		res.status(500).json({ error: 'Error deleting report.' });
	}
};

export const getSpecialReports = (req: Request, res: Response) => {
	try {
		// Fetch all reports from the database and cast to a specific type
		const reports: { id: string; projectid: string; text: string }[] =
			dbService.query('SELECT id, projectid, text FROM reports') as {
				id: string;
				projectid: string;
				text: string;
			}[];

		// Check if there are any reports at all
		if (reports.length === 0) {
			return res.status(404).json({ error: 'No reports found' });
		}

		// Filter reports based on word frequency
		const filteredReports = reports.filter((report) => {
			const words = report.text.toLowerCase().match(/\b\w+\b/g) || [];
			const wordCount: Record<string, number> = {};

			// Count occurrences of each word
			words.forEach((word) => {
				wordCount[word] = (wordCount[word] || 0) + 1;
			});

			// Check if any word appears 3 or more times
			return Object.values(wordCount).some((count) => count >= 3);
		});

		// Check if any reports were found
		if (filteredReports.length === 0) {
			return res.status(404).json({
				error: 'No reports found with the required word frequency',
			});
		}

		// Return the filtered reports
		res.json({ reports: filteredReports });
	} catch (error) {
		console.error('Error fetching or processing reports:', error);
		res.status(500).json({ error: 'Error fetching or processing reports' });
	}
};
