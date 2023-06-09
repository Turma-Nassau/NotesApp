import { Box, Typography } from "@mui/material";
import { NoteObject } from "../models/note";
import Note from "./Note";

interface INotesProps {
  notes: NoteObject[];
  deleteNote: (id: number) => void;
}

const Notes: React.FC<INotesProps> = ({ notes, deleteNote }) => {
  return (
    <Box>
      <Typography variant="h5">Anotações</Typography>
      <Box>
        {notes.map((note) => (
          <Box key={note.id} sx={{ marginBottom: "1rem" }}>
            <Note note={note} deleteNote={deleteNote} />
            <Typography variant="body2">Importância: {note.importance}</Typography>
            <hr />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Notes;


