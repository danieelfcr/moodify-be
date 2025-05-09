const { User } = require('../database/models');

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