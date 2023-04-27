import { FC } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

type ModalProps = {
  title: string
  children: JSX.Element | JSX.Element[]
  open: boolean
  handleOpen: () => void
  noFooter?: boolean
  className?: string
}

const Modal: FC<ModalProps> = ({ title, children, open, handleOpen, noFooter = true, className }) => {
  return (
    <Dialog open={open} handler={handleOpen} className={className}>
      <DialogHeader className='title'>{title}</DialogHeader>
      <DialogBody divider className='content'>
        {children}
      </DialogBody>
      {!noFooter &&
        <DialogFooter>
          <Button
            variant='text'
            onClick={handleOpen}
            className='mr-1'
          >
            <span>Закрыть</span>
          </Button>
        </DialogFooter>
      }
    </Dialog>
  )
}

export default Modal
