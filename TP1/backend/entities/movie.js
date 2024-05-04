import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      unique: true,
    },
    date: {
      type: String,
      unique: false,
    },
    image: {
      type: String,
      unique: true,
    }
  },
});

export default Movie;