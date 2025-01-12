export interface JwtPayload {
    sub: string;       // User's unique identifier (usually the user ID)
    username: string;  // User's name or email
  }