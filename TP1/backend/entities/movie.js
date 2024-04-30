import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    name: {
      primary: true,
      type: String,
    },
    date: {
      type: String,
      unique: false,
    }
  },
});

export default Movie;