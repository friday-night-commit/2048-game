type passwordFetchData = {
  oldPassword: string;
  newPassword: string;
};

// После merge в dev необходимо удалить
interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  role?: string;
}

type OptionsType = {
  headers: { 'Content-Type': string, 'X-CSRF-Token': string };
  credentials: RequestCredentials | undefined;
};
