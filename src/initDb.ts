import sqlite from 'better-sqlite3';
import path from 'path';

const db = new sqlite(path.resolve('./db/db.sqlite3'), {
	fileMustExist: false,
});

const createProjectsTable = `
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT,
    description TEXT,
    UNIQUE(id)
);
`;

const createReportsTable = `
CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY,
    projectid TEXT NOT NULL,
    text TEXT,
    FOREIGN KEY (projectid) REFERENCES projects(id)
);
`;

db.exec(createProjectsTable);
db.exec(createReportsTable);

console.log('Database schema created successfully.');
