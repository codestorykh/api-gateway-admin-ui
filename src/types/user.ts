// User interface
export interface User {
  id: number;
  name: string;
  email: string;
}

// Login request payload
export interface LoginRequest {
  username: string;
  password: string;
}

// Login response payload
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Refresh token request payload
export interface RefreshTokenRequest {
  refreshToken: string;
}

// Refresh token response payload
export interface RefreshTokenResponse {
  token: string;
}
