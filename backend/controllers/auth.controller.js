export const login = (req, res) => {
  res.json({ message: 'You hit the Login endpoint' });
};

export const signup = (req, res) => {
  res.json({ message: 'You hit the Signup endpoint' });
};  

export const logout = (req, res) => {
  res.json({ message: 'You hit the Logout endpoint' });
}