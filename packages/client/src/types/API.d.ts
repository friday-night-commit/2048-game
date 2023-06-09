interface UserRepository {
  getCurrent(): Promise<User | undefined>;
}

interface IUserService {
  getCurrentUser(): Promise<User | undefined>;
}
