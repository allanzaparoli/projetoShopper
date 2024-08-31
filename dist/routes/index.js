"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = require("../controllers/upload.controller");
const confirm_controller_1 = require("../controllers/confirm.controller");
const list_controller_1 = require("../controllers/list.controller");
const router = (0, express_1.Router)();
router.post('/upload', upload_controller_1.uploadImage);
router.patch('/confirm', confirm_controller_1.confirmMeasurement);
router.get('/:customer_code/list', list_controller_1.listMeasures);
exports.default = router;
//# sourceMappingURL=index.js.map