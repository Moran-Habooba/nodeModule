const router = require("express").Router();
const { authorize } = require("../middleware/auth.mw");
const {
  addCard,
  getAllCards,
  getCardById,
  deleteCard,
  getMyCards,
  likeCard,
  editCardById,
  editBizNumberByAdmin,
} = require("../controllers/cards.controller");

function businessOnly(req, res, next) {
  if (!req.user.isBusiness) {
    return res.status(403).send("Access denied. Business users only.");
  }
  next();
}
router.post("/", authorize, businessOnly, addCard);
router.get("/", getAllCards);
router.get("/my-cards", authorize, businessOnly, getMyCards);
router.get("/:id", getCardById);
router.delete("/:id", authorize, deleteCard);
router.patch("/:id", authorize, likeCard);
router.put("/edit/:id", authorize, editCardById);
router.patch("/editBiz/:id", authorize, editBizNumberByAdmin);

module.exports = router;
