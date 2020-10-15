const jwt = require("jsonwebtoken");
const transporter = require("./transporter");
const bcrypt = require("bcrypt");
const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;

  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllSongs: async (parent, { id, word }, { Song }, info) => {
      if (id) {
        const songs = await Song.find({ _id: id });
        return songs;
      }

      if (word) {
        const songs = await Song.find(
          {
            $text: { $search: word },
          },
          {
            score: { $meta: "textScore" },
          }
        ).sort({
          score: { $meta: "textScore" },
        });

        return songs;
      }
      const songs = await Song.find({}).sort({
        likes: "desc",
        createdDate: "desc",
      });

      return songs;
    },

    getUserPosts: async (parent, {}, { Song, currentUser }, info) => {
      try {
        if (currentUser) {
          const posts = await Song.find({ username: currentUser.username });

          return posts;
        }
      } catch (err) {
        throw new Error(err.message);
      }
    },

    Me: async (parent, args, { User, currentUser }, info) => {
      try {
        if (currentUser) {
          const user = await User.findOne({
            email: currentUser.email,
          }).populate({
            path: "favorites",
            model: "Song",
          });

          return user;
        }
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },

  Mutation: {
    addSong: async (parent, { data }, { Song }, info) => {
      const { name, description, category, url, username } = data;
      const newSong = await new Song({
        name,
        description,
        category,
        username,
        url,
      }).save();

      return newSong;
    },
    deleteSong: async (parent, { id }, { Song }, info) => {
      const song = await Song.findOneAndRemove({ _id: id });

      return song;
    },
    updateSong: async (parent, { id, data }, { Song }, info) => {
      if (data) {
        const { name, url, description, category } = data;
        const song = await Song.findOneAndUpdate(
          { _id: id },
          { name: name, url: url, description: description, category: category }
        );
        return song;
      }
      const song = await Song.findOne({ _id: id });

      return song;
    },

    likeSong: async (parent, { id, userid }, { Song, User }, info) => {
      const song = await Song.findOneAndUpdate(
        { _id: id },
        { $inc: { likes: 1 } }
      );
      const user = await User.findOneAndUpdate(
        { _id: userid },
        {
          $addToSet: {
            favorites: id,
          },
        }
      );

      return song;
    },
    unlikeSong: async (parent, { id, userid }, { Song, User }, info) => {
      const song = await Song.findOneAndUpdate(
        { _id: id },
        { $inc: { likes: -1 } }
      );
      await User.findOneAndUpdate(
        { _id: userid },
        {
          $pull: {
            favorites: id,
          },
        }
      );

      return song;
    },
    signUpUser: async (parent, { data }, { User }, info) => {
      const { username, email, password } = data;
      console.log("herer");
      const user = await User.findOne({ username });

      if (user) {
        throw new Error("user alreay exist");
      }

      const newuser = await new User({
        username,
        email,
        password,
      }).save();

      const hashed = await bcrypt.hash(newuser.password, 10);
      newuser.password = hashed;

      await newuser.save();

      const url =
        "https://underrated.herokuapp.com/api/confirmation/" + newuser._id;

      await transporter.sendMail({
        from: '"UnderRated👻" <pastelpack0@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "✔ Email Confirmation", // Subject line
        html: `<h1>Thank you for Signing up to UnderRated, please click the link down below to verify email</h1>
      <a href="${url}">Confirm Email</a>`, // html body
      });

      return {
        token: createToken(newuser, process.env.JWT_SECRET, "24h"),
        user: newuser,
      };
    },

    signInUser: async (parent, { data }, { User }, info) => {
      const { email, password } = data;
      const user = await User.findOne({ email: email });

      if (!user) {
        throw new Error("User not exist");
      }
      if (!user.verified) {
        throw new Error("Email Not Confirmed");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Password is wrong");
      }

      return {
        user: user,
        token: createToken(user, process.env.JWT_SECRET, "24h"),
      };
    },

    createComment: async (
      parent,
      { songId, body },
      { Song, currentUser },
      info
    ) => {
      if (body.trim() === "") {
        throw new Error("Commment must not be empty");
      }
      const song = await Song.findOne({ _id: songId });

      if (song) {
        song.comments.push({
          body,
          username: currentUser.username,
          createdAt: new Date().toISOString(),
        });

        await song.save();

        return song;
      } else {
        throw new Error("Song not found");
      }
    },
    deleteComment: async (parent, { songId, commentId }, { Song }, info) => {
      const song = await Song.findOne({ _id: songId });

      if (song) {
        const commentIdx = song.comments.findIndex((c) => c.id === commentId);
        if (commentIdx > -1) {
          song.comments.splice(commentIdx, 1);
        }
        await song.save();

        return song;
      } else {
        throw new Error("Song not found");
      }
    },
  },
};
