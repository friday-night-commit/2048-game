import React, { FC, useState } from 'react';
import Toast from '../Toast';
import './index.scss';

type TOwnProps = {
  alert?: string;
};

type TProps = FC<TOwnProps>;

const Avatar: TProps = ({ alert }: TOwnProps) => {
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  function handleUpload(e: React.FormEvent<HTMLInputElement>) {
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
  }

  return (
    <div>
      <div className='avatar-container'>
        <img className='avatar-container__image' src={preview} alt={alert} />
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
