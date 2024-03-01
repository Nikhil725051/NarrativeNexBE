const jwt = require('jsonwebtoken');
function generateTokens(userId){
    //Access token
    const accessToken = jwt.sign(
        {
          userId: userId,
        },
        process.env.JWT_KEY,
        { expiresIn: "30m" }
      );
      //Refresh token
      const refreshToken = jwt.sign(
        {
          userId: userId,
        },
        process.env.JWT_KEY,
        { expiresIn: "24h" }
      );

      return {accessToken, refreshToken};
} 

module.exports = generateTokens;