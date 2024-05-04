import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    name: {
      primary: true,
      type: String,
      unique: true,
    },
    date: {
      type: String,
      unique: false,
    },
  },
});

export default Movie;