// pasport-jwt > decode JWT to get expire, secret key, payload(id, name) etc.
// import in index.js

const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../../models");

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

const JWTStrategy = new Strategy(option, async (payload, done) => {
  const targetUser = await db.User.findOne({ where: { id: payload.id } });

  // Strategy will assign targetUser to req.user
  // * only for the request that use passport in routes can access req.user
  if (targetUser) {
    done(null, targetUser);
  } else {
    done(null, false);
  }
});

passport.use("jwt", JWTStrategy);
