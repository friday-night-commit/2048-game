import { Button } from '@material-tailwind/react';
import React, { useRef, useState } from 'react';
import Input from '../../Components/Input';
import { TextEditor } from './components/TextEditor';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import DesktopNotification from '../../WebAPI/notification.service';

export const AddPostPage = () => {
  // Как лучше использовать этот класс в компоненте реакта?
  const desktopNotification = new DesktopNotification().init();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

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
      setError(`${err}`);
    }
  }

  const onRemovePreview = () => {
    setPreview('');
  };

  const onPublishPost = () => {
    desktopNotification.showNotification('Новый пост', 'React + Angular + Vue');
  };

  return (
    <div className='container mx-auto w-full  add-post'>
      <div className='add-post__left'>
        <div className='mb-4'>
          <Input
            name='title'
            type='text'
            validationType='default'
            placeholder='Заголовок статьи...'
            required={true}
          />
        </div>
        <>
          <Button
            onClick={() => inputFileRef.current?.click()}
            className='mb-2 mr-2'>
            Загрузить превью
          </Button>
          <input
            ref={inputFileRef}
            type='file'
            onChange={el => handleUpload(el)}
            hidden
          />
          {preview ? (
            <>
              <Button onClick={onRemovePreview} className='mb-2'>
                Удалить
              </Button>
              <img className='add-post__preview' src={preview} alt='Uploaded' />
            </>
          ) : (
            <div className='add-post__preview'></div>
          )}
        </>

        <Input
          name='tags'
          type='text'
          placeholder='Теги'
          required={true}
          validationType='default'
        />
      </div>

      <div className='add-post__right'>
        <TextEditor textAreaHeight={310} />
      </div>

      <div className='add-post__action'>
        <Button
          disabled={!!error}
          onClick={onPublishPost}
          className=' mb-2 px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'>
          Опубликовать
        </Button>
        <Button
          onClick={() => navigate(-1)}
          className='px-5 py-2.5 text-sm font-medium text-center text-white bg-amber-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'>
          Отмена
        </Button>
      </div>
    </div>
  );
};
