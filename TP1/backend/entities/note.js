import typeorm from 'typeorm';

const Note = new typeorm.EntitySchema({
  name: 'Note',
  columns: {
    id: {
        primary: true,
        generated: 'uuid',
        type: String,
      },
    note: { type: Number },
    movieId: { type: Number },
  },
});

export default Note;