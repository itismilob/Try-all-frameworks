import { readFileSync } from 'fs';
import express from 'express';
import admin from 'firebase-admin';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { initializeApp, cert } from 'firebase-admin/app';
import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_PATH, 'utf8'));

const server = express();
const PORT = process.env.PORT || 8080;

// Firebase 초기화
initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.FIREBASE_DATABASE_URL
});

// Firebase 초기화 후에 라우터 import
const dbRouter = await import('./db.js');
const staticRouter = await import('./static.js');

server.use(express.json());
server.use((req, res, next) => {
	console.log(`${req.method} ${req.originalUrl}`);
	next();
});

//////

server.use('/api', dbRouter.default);
server.use('/', staticRouter.default);

server.use((err, req, res, next) => {
	console.error(err);
	res.status(err.status || 500).json({
		error: {
			message: err.message || 'Internal Server Error'
		}
	});
});

server.listen(PORT, () => {
	console.log(`Server open in ${PORT}\nhttp://localhost:${PORT}`);
});
