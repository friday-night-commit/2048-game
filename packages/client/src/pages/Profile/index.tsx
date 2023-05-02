import { useState } from 'react';
import { Typography } from '@material-tailwind/react';
import Avatar from '../../Components/Avatar';
import CardContainer from '../../Components/CardContainer';
import { ChangePasswordModal } from './components/ChangePassword/ChangePassword';
import ProfileForm from '../../Components/ProfileForm';

export enum UserFields {
  first_name = 'first_name',
  second_name = 'second_name',
  login = 'login',
  email = 'email',
  phone = 'phone',
}

export default function ProfilePage() {
  const [visibilityChangePasswordModal, setVisibilityChangePasswordModal] =
    useState(false);

  const openChangePasswordModal = () => {
    setVisibilityChangePasswordModal(prev => !prev);
  };

  return (
    <CardContainer>
      <Typography variant="h3" className="text-center mb-8">
        Настройки профиля
      </Typography>

      <div className="mb-8 flex justify-center">
        <Avatar />
      </div>
      <ProfileForm openChangePasswordModal={openChangePasswordModal} />
      <ChangePasswordModal
        handleOpen={openChangePasswordModal}
        onClose={openChangePasswordModal}
        open={visibilityChangePasswordModal}
      />
    </CardContainer>
  );
}
