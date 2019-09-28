module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  // password: 'P20e16dro%',
  password: 'mysecretpassword',
  database: 'postgres',
  define: {
    // Garanties a created_at and updated_at column on the created tables
    timestamps: true,
    // use snake_pattern on the created tables
    underscored: true,
    underscoredAll: true,
  },
};
