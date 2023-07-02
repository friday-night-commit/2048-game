import { FC } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
// @ts-ignore // Без этого не работает
import quillEmoji from 'react-quill-emoji';

import './index.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { updatePostContent } from '../../../../store/slices/Forum';
import { updateCommentContent } from '../../../../store/slices/Comment';
import { CONTENT_TYPE } from '../../../Forum/forum.interfaces';

type TextEditorProps = {
  textAreaHeight: number;
  contentType: CONTENT_TYPE;
};

const TextEditor: FC<TextEditorProps> = ({
  textAreaHeight = 350,
  contentType,
}: TextEditorProps) => {
  Quill.register(
    {
      'modules/emoji-toolbar': quillEmoji.ToolbarEmoji,
      'modules/emoji-textarea': quillEmoji.TextAreaEmoji,
      'modules/emoji-shortname': quillEmoji.ShortNameEmoji,
    },
    true
  );

  const postContent = useAppSelector(state => state.forumSlice.postContent);
  const commentContent = useAppSelector(state => state.commentSlice.commentContent);

  const dispatch = useAppDispatch();

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
  const handleChange = (html: string) => {
    if (contentType === CONTENT_TYPE.POST) {
      dispatch(updatePostContent(html));
    } else if (contentType === CONTENT_TYPE.COMMENT) {
      dispatch(updateCommentContent(html));
    }
  };

  return (
    <div>
      <ReactQuill
        style={{ height: textAreaHeight }}
        theme='snow'
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder='Write new text'
        value={contentType === CONTENT_TYPE.POST ? postContent : commentContent}
      />
    </div>
  );
};

export default TextEditor;
