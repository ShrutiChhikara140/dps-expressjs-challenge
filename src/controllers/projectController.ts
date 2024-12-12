import { Request, Response } from 'express';
import dbService from '../services/db.service';

// Create a new project
export const createProject = (req: Request, res: Response) => {
	const { id, name, description } = req.body;

	// Validate request body
	if (!id || !name) {
		return res.status(400).send('Project ID and name are required');
	}

	try {
		dbService.run(
			'INSERT INTO projects (id, name, description) VALUES (?, ?, ?)',
			[id, name, description],
		);
		console.log('Project created with ID:', id);
		res.status(201).json({
			message: 'Project created successfully',
			projectId: id,
		});
	} catch (error) {
		console.error('Error creating project:', error);
		res.status(500).send('Error creating project');
	}
};

// Get all projects
export const getAllProjects = (req: Request, res: Response) => {
	try {
		const projects = dbService.query(
			'SELECT id, name, description FROM projects',
		);
		res.json(projects);
	} catch (error) {
		console.error('Error fetching projects:', error);
		res.status(500).send('Error fetching projects');
	}
};

// Get a project by ID
export const getProjectById = (req: Request, res: Response) => {
	const { id } = req.params;

	// Validate request parameters
	if (!id) {
		return res.status(400).send('Project ID is required');
	}

	try {
		const project = dbService.query(
			'SELECT id, name, description FROM projects WHERE id = ?',
			[id],
		);
		if (project.length === 0) {
			return res.status(404).send('Project not found');
		} else {
			res.json(project[0]);
		}
	} catch (error) {
		console.error('Error fetching project:', error);
		res.status(500).send('Error fetching project');
	}
};

// Update a project by ID
export const updateProjectById = (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, description } = req.body;

	// Validate request parameters and body
	if (!id) {
		return res.status(400).send('Project ID is required');
	}

	if (!name || !description) {
		return res.status(400).send('Both name and description are required');
	}

	try {
		dbService.run(
			'UPDATE projects SET name = ?, description = ? WHERE id = ?',
			[name, description, id],
		);

		const response = {
			message: `Project with ID ${id} has been updated.`,
			updatedProject: {
				id,
				name,
				description,
			},
		};

		console.log(response);
		res.status(200).json(response);
	} catch (error) {
		console.error('Error updating project:', error);
		res.status(500).send('Error updating project');
	}
};

// Delete a project by ID
export const deleteProjectById = (req: Request, res: Response) => {
	const { id } = req.params;

	// Validate request parameters
	if (!id) {
		return res.status(400).send('Project ID is required');
	}

	try {
		dbService.run('DELETE FROM projects WHERE id = ?', [id]);

		const response = {
			message: `Project with ID ${id} has been deleted.`,
			deletedProjectId: id,
		};

		console.log(response);
		res.status(200).json(response);
	} catch (error) {
		console.error('Error deleting project:', error);
		res.status(500).send('Error deleting project');
	}
};

// Create reports for a project
export const createReportForProject = (req: Request, res: Response) => {
	const { projectid } = req.params;
	const reports = req.body.reports;

	// Validate request parameters and body
	if (!projectid) {
		return res.status(400).send('Project ID is required in the URL');
	}

	if (!Array.isArray(reports) || reports.length === 0) {
		return res
			.status(400)
			.send('At least one report is required in the request body');
	}

	try {
		const insertedReports = [];
		for (const report of reports) {
			const { id, text } = report;

			// Validate each report
			if (!id || !text) {
				return res
					.status(400)
					.send('Each report must have an id and text');
			}

			// Insert each report into the database
			dbService.run(
				'INSERT INTO reports (id, projectid, text) VALUES (?, ?, ?)',
				[id, projectid, text],
			);

			// Add the inserted report to the response list
			insertedReports.push({ id, projectid, text });
		}

		res.status(201).json({ projectid, reports: insertedReports });
	} catch (error) {
		console.error('Error creating reports:', error);
		res.status(500).send('Error creating reports');
	}
};

// Get reports for a project
export const getReportsForProject = (req: Request, res: Response) => {
	const { projectid } = req.params;

	// Validate request parameters
	if (!projectid) {
		return res.status(400).send('Project ID is required');
	}

	try {
		const reports = dbService.query(
			'SELECT id, projectid, text FROM reports WHERE projectid = ?',
			[projectid],
		);
		res.json(reports);
	} catch (error) {
		console.error('Error fetching reports:', error);
		res.status(500).send('Error fetching reports');
	}
};
