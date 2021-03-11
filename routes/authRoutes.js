const mongoose = require("mongoose");
const passport = require("passport");

const Users = mongoose.model("users");
const Team = mongoose.model("Team");
module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.post("/api/save", async (req, res) => {
    const user = await Users.findById(req.user._id);
    const team = await new Team({ players: req.body });
    user.teams.push(team);
    await user.save();
    res.status(200);
  });
};
