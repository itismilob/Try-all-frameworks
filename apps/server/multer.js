import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 업로드 폴더 경로 설정
const uploadFolder = path.join(__dirname, './public/uploads');

// Multer 저장소 설정
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadFolder); // 파일 저장 경로
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + '-' + file.originalname); // 파일명 설정
	}
});

// 파일 필터 (이미지만 허용)
const fileFilter = (req, file, cb) => {
	const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
	if (!allowedTypes.includes(file.mimetype)) {
		return cb(new Error('이미지 파일만 업로드할 수 있습니다.'), false);
	}
	cb(null, true);
};

// Multer 미들웨어 생성
const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
	fileFilter
});

export { upload };
