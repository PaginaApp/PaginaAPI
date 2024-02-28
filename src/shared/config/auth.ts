export const jwtConfig = {
  secret: process.env.API_SECRET,
  expiresIn: process.env.API_EXPIRATION,
};

export const refreshTokenConfig = {
  expiresIn: process.env.REFRESH_EXPIRATION,
  prefix: process.env.REFRESH_PREFIX,
};
