import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { handler as svelteHandler } from './dist/svelte-build/handler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.use('/public', express.static(path.join(__dirname, './public')));
router.use('/styles', express.static(path.join(__dirname, '../styles')));
router.use('/', express.static(path.join(__dirname, './dist/js')));

router.use('/react', express.static(path.join(__dirname, './dist/react-build')));
router.get('/react/*', (req, res) => {
	res.sendFile(path.join(__dirname, './dist/react-build/index.html'));
});

router.use('/vue', express.static(path.join(__dirname, './dist/vue-build')));
router.get('/vue/*', (req, res) => {
	res.sendFile(path.join(__dirname, './dist/vue-build/index.html'));
});

router.use('/angular', express.static(path.join(__dirname, './dist/angular-build')));
router.get('/angular/*', (req, res) => {
	res.sendFile(path.join(__dirname, './dist/angular-build/browser/index.html'));
});

router.use('/svelte', svelteHandler);
router.get('/svelte/*', express.static(path.join(__dirname, './dist/svelte-build')));

router.use('/jquery', express.static(path.join(__dirname, './dist/jquery-build')));
router.get('/jquery/*', (req, res) => {
	res.sendFile(path.join(__dirname, './dist/jquery-build/index.html'));
});

export default router;
