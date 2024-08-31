import { Router } from 'express';
import { uploadImage } from '../controllers/upload.controller';
import { confirmMeasurement } from '../controllers/confirm.controller';
import { listMeasures } from '../controllers/list.controller';

const router = Router();

router.post('/upload', uploadImage);
router.patch('/confirm', confirmMeasurement);
router.get('/:customer_code/list', listMeasures);

export default router;
