import React, { useCallback, useState } from 'react';
import Toast from '../Toast';
import './index.scss';

const Avatar = () => {
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  const handleUpload = useCallback(
    function (e: React.FormEvent<HTMLInputElement>) {
      if (!e) {
        return;
      }
      const target = e.target as HTMLInputElement;
      try {
        if (target.files && target.files.length) {
          const uri = URL.createObjectURL(target.files[0]);
          setPreview(uri);
        }
      } catch (e) {
        const err = (e as Error).message;
        setError(err);
      }
    },
    [error]
  );

  return (
    <div>
      <div className='avatar-container'>
        <img className='avatar-container__image' src={preview} alt='photo' />
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
