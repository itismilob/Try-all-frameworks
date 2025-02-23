const express = require('express');
const router = express.Router();
const path = require('path');

router.use('/public', express.static(path.join(__dirname, '../dist/public')));
router.use('/styles', express.static(path.join(__dirname, '../dist/styles')));
router.use('/', express.static(path.join(__dirname, '../dist/js')));

router.use('/react', express.static(path.join(__dirname, '../dist/react-build')));
router.get('/react/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../dist/react-build/index.html'));
});

router.use('/vue', express.static(path.join(__dirname, '../dist/vue-build')));
router.get('/vue/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../dist/vue-build/index.html'));
});

router.use('/angular', express.static(path.join(__dirname, '../dist/angular-build')));
router.get('/angular/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../dist/angular-build/browser/index.html'));
});

router.use('/svelte', async (req, res, next) => {
	const { handler } = await import('../dist/svelte-build/handler.js');
	handler(req, res, next);
});

module.exports = router;
