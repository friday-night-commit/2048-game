import { FC, FormEvent } from 'react'

type TOwnProps = {
  className?: string
  handleSubmit: (formData: FormData) => void
  children?: JSX.Element | JSX.Element[]
}

type TProps = FC<TOwnProps>

const Form: TProps = props => {
  const { children, handleSubmit, className } = props;

  const decoratedHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    handleSubmit(formData);
  }

  return (
    <form className={className} onSubmit={decoratedHandleSubmit}>{children}</form>
  )
}

export default Form
