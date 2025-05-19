const { User, Song, Emotion, Recommendation } = require('../database/models');
const { Sequelize } = require('../database/config')

//Sign up: register user
exports.postUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await User.create({name, email, password});
        //Return user w/o psswd
        const userToReturn = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        };
        res.status(201).json(userToReturn);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Email already exists' });
        }
        res.status(500).json({error: error});
    }
}

//Get user history
exports.getUserHistory = async (req, res) => {
  try {
    const userId = req.params.userId;

    const recommendations = await Recommendation.findAll({
      where: { userId },
      include: [
        {
          model: Song,
          attributes: ["songName", "artist"],
          include: [
            {
              model: Emotion,
              attributes: ["label"],
            },
          ],
        },
      ],
      attributes: ["createdAt"],
      order: [["createdAt", "DESC"]],
    });

    const grouped = {};

    recommendations.forEach((rec) => {
      const key = new Date(rec.createdAt).toISOString();
      const emotionName = rec.Song.Emotion.label;

      if (!grouped[key]) {
        grouped[key] = {
          emotion: emotionName,
          createdAt: rec.createdAt,
          songs: [],
        };
      }

      grouped[key].songs.push({
        songName: rec.Song.songName,
        artist: rec.Song.artist,
      });
    });

    const result = Object.values(grouped);

    res.status(200).json({ history: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal server error",
      detail: err.message,
    });
  }
};

