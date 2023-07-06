type StoreState = {
  userSlice: userState;
  modalSlice: modalState;
};

type userState = {
  user: User | undefined;
  isLoaded: boolean;
  maxScore: number;
};

type modalState = {
  isOpenSuccess: boolean;
  isOpenFailure: boolean;
  isNewMatrix: boolean;
  isContinuePlay: boolean;
};
