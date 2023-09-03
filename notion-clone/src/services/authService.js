const bcrypt = require('bcrypt');
const { User } = require('../models'); // Assuming you have a User model

async function registerUser(username, password) {
  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user document in MongoDB
    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    
    return true; // Registration successful
  } catch (error) {
    console.error('Registration error:', error);
    return false; // Registration failed
  }
}

async function loginUser(username, password) {
  try {
    // Find the user in the database by username
    const user = await User.findOne({ username });
    
    if (!user) {
      return false; // User not found
    }
    
    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return true; // Login successful
    } else {
      return false; // Invalid password
    }
  } catch (error) {
    console.error('Login error:', error);
    return false; // Login failed
  }
}

module.exports = {
  registerUser,
  loginUser,
};
