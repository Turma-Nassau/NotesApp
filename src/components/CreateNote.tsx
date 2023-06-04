import { useState } from 'react';
import { InputBase, Box, Button, styled, Typography, ButtonGroup } from '@mui/material';
import { NoteObject } from '../models/note';
import { TITLE_LIMIT, DETAILS_LIMIT } from '../constants/constant';
import { v4 as uuid } from 'uuid';

const Container = styled(Box)`
  & > * {
    margin: 20px 20px 20px 0;
  }
  & > div > input[type="text"] {
    border-bottom: 1px solid #111111;
    opacity: 0.4;
    width: 300px;
    padding-right: 25px;
  }
  & > div > input[type="color"] {
    width: 40px;
    height: 30px;
    position: relative;
    bottom: -10px;
  }
  & > span {
    font-size: 10px;
    position: relative;
    right: 40px;
  }
`;

const Error = styled(Typography)`
  background: red;
  color: #fff;
  padding: 10px;
  width: 50%;
`;

const defaultObj = {
  id: 0,
  title: '',
  details: '',
  color: '',
  date: new Date().toLocaleString().toString(),
  importance: 'baixa importância',
};

interface ICreateNoteProps {
  addNotes: (note: NoteObject) => void;
}

const CreateNote: React.FC<ICreateNoteProps> = ({ addNotes }) => {
  const [note, setNote] = useState<NoteObject>(defaultObj);
  const [error, setError] = useState<string>('');
  const [importance, setImportance] = useState<string>('baixa importância');

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    if (error) {
      setError('');
    }
  };

  const onCreateNote = () => {
    if (!note.title || !note.details) {
      setError('Todos os campos são obrigatórios');
      return;
    }
    addNotes({ ...note, id: uuid() });
    setNote(defaultObj);
    setImportance('baixa importância');
    setNote({ ...note, color: '' }); // Redefinir a cor para o padrão (não feito)
  };

  const handleImportanceChange = (value: string) => {
    setImportance(value);
    setNote({ ...note, importance: value });
  };

  return (
    <Container>
      <InputBase
        placeholder="Título"
        onChange={(e) => onValueChange(e)}
        name="title"
        value={note.title}
        inputProps={{
          maxLength: TITLE_LIMIT,
        }}
      />
      <Box component="span">{note.title.length}/{TITLE_LIMIT}</Box>
      <InputBase
        placeholder="Detalhes"
        onChange={(e) => onValueChange(e)}
        name="details"
        value={note.details}
        inputProps={{
          maxLength: DETAILS_LIMIT,
        }}
      />
      <Box component="span">{note.details.length}/{DETAILS_LIMIT}</Box>
      <InputBase
        type="color"
        defaultValue={note.color || '#F5F5F5'}
        placeholder="Escolha uma Cor"
        onChange={(e) => onValueChange(e)}
        name="color"
      />
      <ButtonGroup>
        <Button
          variant={importance === 'baixa importância' ? 'contained' : 'outlined'}
          onClick={() => handleImportanceChange('baixa importância')}
        >
          Baixa Importância
        </Button>
        <Button
          variant={importance === 'importância moderada' ? 'contained' : 'outlined'}
          onClick={() => handleImportanceChange('importância moderada')}
        >
          Importância Moderada
        </Button>
        <Button
          variant={importance === 'URGENTE' ? 'contained' : 'outlined'}
          onClick={() => handleImportanceChange('URGENTE')}
        >
          URGENTE
        </Button>
      </ButtonGroup>
      <Button variant="outlined" onClick={() => onCreateNote()}>
        CRIAR
      </Button>
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default CreateNote;