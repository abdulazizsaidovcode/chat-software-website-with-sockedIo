import userCollection from "../model/userModel.js";
import bcrypt from 'bcrypt';
export const register = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        const userNameCheck = await userCollection.findOne({ userName });
        if (userNameCheck) return res.json({ msg: "Username already exist", status: false });
        const emailCheck = await userCollection.findOne({ email });
        if (emailCheck) return res.json({ msg: "Email already exist", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userCollection.create({
            userName,
            email,
            password: hashedPassword
        });
        delete user.password;
        return res.json({ status: true, user });
    }
    catch (e) {
        next(e);
    }
};

export const login = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        const userNameCheck = await userCollection.findOne({ userName });
        if (!userNameCheck) return res.json({ msg: "Incorrect username or password", status: false });
        const passwordCheck = await bcrypt.compare(password, userNameCheck.password);
        if (!passwordCheck) return res.json({ msg: "Incorrect username or password", status: false });
        delete userName.password;
        return res.json({ status: true, userNameCheck });
    }
    catch (e) {
        next(e);
    }
};

export const setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await userCollection.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage
        });
        return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage })
    }
    catch (e) {
        next(e)
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userCollection.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "userName",
            "avatarImage",
            "_id"
        ])
        return res.json(users)
    }
    catch (e) {
        next(e)
    }
};