import { FC } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import './index.scss';

type QuillContentProps = {
  content: string;
  textAreaHeight?: number;
};

const QuillContent: FC<QuillContentProps> = ({
  content,
  textAreaHeight = 200,
}: QuillContentProps) => {
  return <ReactQuill
    style={{ height: textAreaHeight }}
    value={content} readOnly={true} theme={'bubble'} />;
};

export default QuillContent;
