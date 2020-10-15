const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });
const bodyParser = require("body-parser");
const Song = require("./models/Song.js");
const User = require("./models/User.js");

const { ApolloServer } = require("apollo-server-express");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

app.use(async (req, res, next) => {
  const header = req.headers.authorization;

  if (header) {
    try {
      const token = header.replace("Bearer ", "");

      const currentUser = jwt.decode(token, "mysecret");

      req.user = currentUser;
    } catch (err) {
      console.log(err);
    }
  }

  next();
});

app.get("/api/confirmation/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByIdAndUpdate({ _id: id }, { verified: true });
  } catch (error) {
    res.send(error);
  }

  return res.redirect("https://underrated.herokuapp.com/signin");
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return {
      User,
      Song,
      currentUser: req.user,
    };
  },
});

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: new RegExp("/*/"),
  },
});

//mongoose connnect
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sednFİle(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log("Server started " + PORT);
});
