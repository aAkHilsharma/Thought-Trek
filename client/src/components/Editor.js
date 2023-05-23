import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = ({ value, onChange }) => {
  return (
    <ReactQuill theme='snow' name='content' value={value} onChange={onChange} />
  );
};

export default Editor;
