import { FC, useState } from 'react'
import avatar from '../../assets/avatar.png'

import './avatar.scss'
import Input from '../Input/Input'

type TOwnProps = {
  src?: string;
}

type TProps = FC<TOwnProps>

const Avatar: TProps = ({ src }) => {

  const [preview, setPreview] = useState(null)

  function onClose() {
    setPreview(null)
  }

  function onCrop(pv: any) {
    setPreview(pv)
  }

  function onBeforeFileLoad(elem: any) {
    if (elem.target.files[0].size > 71680) {
      alert('Файл имеет слишком большой размер!')
      elem.target.value = ''
    }
  }

  return (
    <div className='settings-user-avatar'>
      <img className='settings-user-avatar__image' src={avatar} alt='photo' />
      <label className='settings-user-avatar__file'>
        <span className='settings-user-avatar__text'>Нажмите чтобы изменить ваш аватар</span>
        <Input
          type='file'
          additionalClasses='settings-user-avatar__input'
          name='avatar'
        />
      </label>
    </div>
  )
}

export default Avatar
