interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

interface SigninData {
  login: string;
  password: string;
}

interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  theme: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  role?: string;
}
