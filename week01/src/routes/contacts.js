const router = require("express").Router();
const contactController = require("../controllers/contacts");

router.get("/", contactController.getAll);
router.get("/:id", contactController.get);

router.post("/", contactController.create);
router.put("/:id", contactController.update);
router.delete("/:id", contactController.deleteUser);

module.exports =  router;