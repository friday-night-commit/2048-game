import { FC } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import './index.scss';

type QuillContentProps = {
  content: string;
};

const QuillContent: FC<QuillContentProps> = ({
  content,
}: QuillContentProps) => {
  return <ReactQuill value={content} readOnly={true} theme={'bubble'} />;
};

export default QuillContent;
