const router = require("express").Router();
const contactController = require("../controllers/contacts");

router.get("/", contactController.getAll);
router.get("/:id", contactController.get);

module.exports =  router;