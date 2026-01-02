export interface User {
  id: string;
  displayName: string;
  email: string;
  token: string;
  imageUrl?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  displayName: string;
  email: string;
  password: string;
}
