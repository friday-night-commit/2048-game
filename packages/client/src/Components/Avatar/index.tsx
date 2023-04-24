import React, { FC, useState } from 'react'
import './avatar.scss'
import Toast from '../Toast'

type TOwnProps = {
  alert?: string;
}

type TProps = FC<TOwnProps>

const Avatar: TProps = ({alert}) => {
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')

  function handleError(e: React.SyntheticEvent<HTMLInputElement>) {
    console.log('handleError', e)
  }

  function handleUpload(e: React.FormEvent<HTMLInputElement>) {
    if (!e) {
      return
    }
    const target = e.target as HTMLInputElement

    try {
      if (target.files && target.files.length) {
        const uri = URL.createObjectURL(target.files[0])
        setPreview(uri)
      }
    } catch (e) {
      console.log('e', e)
      const err = (e as Error).message
      setError(err)
    }
  }

  return (
    <div>
      <div className='avatar-container'>
        <img className='avatar-container__image' src={preview} alt={alert} />
        <label className='avatar-container__file'>
          <span className='avatar-container__text'>Нажмите чтобы изменить ваш аватар</span>
          <input
            type='file'
            className='avatar-container__input'
            name='avatar'
            accept='image/*'
            onChange={el => handleUpload(el)}
            onError={err => handleError(err)}
          />
        </label>
      </div>
      {error && <Toast text={error} />}
    </div>
  )
}

export default Avatar