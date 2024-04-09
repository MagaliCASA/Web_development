import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    titre: {
      primary: true,
      type: String,
      unique: true,
    },
    date_de_sortie: {
      type: String,
      unique: false,
    },
  },
});

export default Movie;
