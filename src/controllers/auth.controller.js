const authService = require("../services/auth.service");

exports.signup = async (req, res, next) => {
  console.log("✅ signup 요청 들어옴", req.body); // 로그 확인용
  try {
    const user = await authService.signup(req.body);
    res.status(201).json({ message: "Signup success", user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const tokens = await authService.login(req.body);
    res.status(200).json(tokens);
  } catch (err) {
    next(err);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const { token } = req.body;
    const accessToken = await authService.refresh(token);
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await authService.logout(userId);
    res.status(200).json({ message: "Logout success" });
  } catch (err) {
    next(err);
  }
};
