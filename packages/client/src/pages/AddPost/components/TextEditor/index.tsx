import { FC, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
// @ts-ignore // Без этого не работает
import quillEmoji from 'react-quill-emoji';

import './index.scss';

type TextEditorProps = {
  textAreaHeight: number;
};

const TextEditor: FC<TextEditorProps> = ({
  textAreaHeight = 350,
}: TextEditorProps) => {

  useEffect(() => {
    Quill.register(
        {
          'modules/emoji-toolbar': quillEmoji.ToolbarEmoji,
          'modules/emoji-textarea': quillEmoji.TextAreaEmoji,
          'modules/emoji-shortname': quillEmoji.ShortNameEmoji,
        },
        true
    );
  }, []);

  const modules = {
    'emoji-textarea': true,
    'emoji-shortname': true,
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
      ['emoji'],
    ],
    keyboard: { bindings: { tab: false } },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];
  const handleChange = (html: unknown) => {
    // eslint-disable-next-line no-console
    console.log('handleChange', html);
  };

  return (
    <div>
      <ReactQuill
        style={{ height: textAreaHeight }}
        theme='snow'
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder='Hello'
      />
    </div>
  );
};

export default TextEditor;
