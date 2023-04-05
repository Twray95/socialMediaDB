const router = require("express").Router();
const { 'thoughtController ' } = require('../../controllers/thoughtController')

router.route("/").get("getThought").post("createThought");

module.exports = router;
