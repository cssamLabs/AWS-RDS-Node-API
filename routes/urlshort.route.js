const express = require('express');
const router = express.Router();
const urlshort_controller = require('../controllers/urlshort.controller');

router.get("/urlshortList", urlshort_controller.findUrlshorts);
router.get("/urlshort/:id", urlshort_controller.findUrlshortById);
router.get("/urlshort/:original_url", urlshort_controller.findUrlshortByOriginalUrl);
router.post("/urlshort", urlshort_controller.createUrlshort);
router.put("/urlshort/:id", urlshort_controller.updateUrlshort);
router.delete("/urlshort/:id",  urlshort_controller.deleteUrlshort);

module.exports = router;