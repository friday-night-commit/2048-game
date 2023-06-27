import { Button } from '@material-tailwind/react';
import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../Components/Input';
import DesktopNotification from '../../WebAPI/notification.service';

const LazyTextEditorComponent = lazy(() => import('./components/TextEditor'));

import './index.scss';
import { ForumPost } from '../Forum/stubs';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearContent, createPost } from '../../store/slices/Forum';

export const AddPostPage = () => {
  let desktopNotification: DesktopNotification;

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const content = useAppSelector(state => state.forumSlice.postContent);

  // eslint-disable-next-line no-console
  console.log('AddPostPage content', content);

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

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const formData = new FormData(target);
      const title = formData.get('title')?.toString();
      const tag = formData.get('tag')?.toString();
      const preview = formData.get('preview');
      const imageUrl =
        'https://www.itshop.ru/productimages/auto/pimg_2021101_182.png';

      if (!title) {
        return;
      }
      // eslint-disable-next-line no-console
      console.log('onSubmit content', content);

      if (!content) {
        // eslint-disable-next-line no-console
        console.log('Add post content is not found!');
        return;
      }

      if (!tag) {
        return;
      }

      if (!imageUrl) {
        return;
      }

      const newPost: ForumPost = {
        title,
        tag,
        imageUrl,
        text: content,
      };

      dispatch(createPost(newPost)).then(data => {
        if(data){
          // eslint-disable-next-line no-console
          console.log('dispatch(createPost(newPost))', data);
          dispatch(clearContent());
          // window.location.reload();
          const newPost: ForumPost = data.payload as ForumPost;
          if(newPost){
            desktopNotification.showNotification('Новый пост', newPost.title);
          }
        }
      });
    },
    []
  );

  useEffect(() => {
    desktopNotification = new DesktopNotification().init();
  }, []);

  return (
    <form className='container mx-auto w-full  add-post' onSubmit={onSubmit}>
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
          name='tag'
          type='text'
          placeholder='Тег'
          required={true}
          validationType='tag'
        />
      </div>

      <div className='add-post__right'>
        <Suspense fallback={<textarea />}>
          <LazyTextEditorComponent textAreaHeight={310} />
        </Suspense>
      </div>

      <div className='add-post__action'>
        <Button
          disabled={!!error}
          type='submit'
          className=' mb-2 px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'>
          Опубликовать
        </Button>
        <Button
          onClick={() => navigate(-1)}
          className='px-5 py-2.5 text-sm font-medium text-center text-white bg-amber-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'>
          Отмена
        </Button>
      </div>
    </form>
  );
};
