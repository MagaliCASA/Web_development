import typeorm from 'typeorm';

const Comment = new typeorm.EntitySchema({
  name: 'Comment',
  columns: {
    id: {
        primary: true,
        generated: 'uuid',
        type: String,
      },
    comment: { type: String },
    movieId: { type: Number },
  },
});

export default Comment;