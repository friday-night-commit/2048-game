import React, { useCallback, useState, FC, useEffect } from 'react';
import Toast from '../Toast';
import './index.scss';
import ProfileController from '../../Controllers/ProfileController';
import { fileHosting } from '../../api/consts';
import { default_comment_avatar } from '../../pages/Forum/forum.interfaces';

type AvatarProps = {
  userAvatar?: string;
};

const Avatar: FC<AvatarProps> = ({ userAvatar }) => {
  const [preview, setPreview] = useState(fileHosting + userAvatar || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setPreview(fileHosting + userAvatar || '');
  }, [userAvatar]);

  const handleUpload = useCallback(
    function (e: React.FormEvent<HTMLInputElement>) {
      if (!e) {
        return;
      }
      const target = e.target as HTMLInputElement;

      try {
        if (target.files && target.files.length) {
          const file = target.files[0];
          const uri = URL.createObjectURL(file);
          setPreview(uri);
          const formData = new FormData();
          formData.append('avatar', file, file.name);
          ProfileController.changeAvatar(formData);
        }
      } catch (e) {
        const err = (e as Error).message;
        setError(err);
      }
    },
    [error, preview]
  );

  return (
    <div>
      <div className={`avatar-container ${!userAvatar && 'not-found'}`}>
        <img className='avatar-container__image' src={preview}
             onError={({ currentTarget }) => {
               currentTarget.onerror = null;
               currentTarget.src=default_comment_avatar;
             }}
             alt='photo' />
        <label className='avatar-container__file'>
          <span className='avatar-container__text'>
            Нажмите чтобы изменить ваш аватар
          </span>
          <input
            type='file'
            className='avatar-container__input'
            name='avatar'
            accept='image/*'
            onChange={el => handleUpload(el)}
          />
        </label>
      </div>
      {error && <Toast text={error} />}
    </div>
  );
};

export default Avatar;
