import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes';
import reportRoutes from './routes/reportRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Middleware for authentication
const authenticate = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['authorization'];
	if (token === 'Password123') {
		next();
	} else {
		res.status(401).send('Unauthorized: Invalid or missing token');
	}
};
app.use((req, res, next) => {
	console.log(`${req.method} ${req.path}`);
	next();
});

app.use(authenticate);
app.use('/api', projectRoutes);
app.use('/api', reportRoutes);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
