type StoreState = {
  userSlice: userState;
  modalSlice: modalState;
};

type userState = {
  user: User | undefined;
  isLoaded: boolean;
};

type modalState = {
  isOpenSuccess: boolean;
  isOpenFailure: boolean;
};
