import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generatetokenAndsetCookie } from '../libs/utils/generateToken.js';


export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    const isPasswordCorrect = user ? await bcrypt.compare(password, user.password) : false;
    if (!user || !isPasswordCorrect) {
      return  res.status(400).json({ message: 'Invalid username or password' });
    }

    generatetokenAndsetCookie(user._id, res);
    res.status(200).json({ 
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      followers: user.followers,
      following: user.following,
      bio: user.bio,
      link: user.link,
      profilePicture: user.profilePicture
    });

  } catch (error) {
    console.log("error in login controller:", error.message);
    res.status(500).json({ message: 'internal Server error' });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already taken' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    // hash the password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      fullName
    });

    if(newUser){
      generatetokenAndsetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({ 
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        fullName: newUser.fullName,
        followers: newUser.followers,
        following: newUser.following,
        bio: newUser.bio,
        link: newUser.link,
        profilePicture: newUser.profilePicture
      })
     } else {
      res.status(400).json({ message: 'Invalid user data' });
    }

  } catch (error) {
    console.log("error in signup controller:", error.message);
    res.status(500).json({ message: 'internal Server error' });
  };
};  

export const logout = async (req, res) => {
  try {
    res.clearCookie('jwt', "", {
      marxAge: 0
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log("error in logout controller:", error.message);
    res.status(500).json({ message: 'internal Server error' });
  }
}

export const getMe = async (req, res) => {
  try {
    
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.log("error in getMe controller:", error.message);
    res.status(500).json({ message: 'internal Server error' });
  }
};