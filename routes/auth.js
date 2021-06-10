const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const protectRoute = require("../util/protectRoute")

//register router
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//log in router
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("Wrong data!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong data!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});


// change password //
router.put('/changePass/:id', async (req, res) => {
  try {
    const userId = req.params.id
    let user = await User.findById(userId)
    if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
      let salt = bcrypt.genSaltSync()
      let hash = bcrypt.hashSync(req.body.newPassword, salt)
      //await user.findOneAndUpdate (userId ,{password: hash})

      const filter = { _id: userId };
      const update = { password: hash };
      await User.findOneAndUpdate(filter, update);

      res.json({ message: "password chane successflly!" })
    } else {
      throw new Error("Password incorrect")
    }
  } catch (err) {
    res.status(400).json({ name: err.name, message: err.message, url: req.originalUrl })
  }
})

module.exports = router;
