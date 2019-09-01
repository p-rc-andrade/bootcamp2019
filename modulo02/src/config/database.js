module.exports = {
  dialect: 'postgres',
  host: 'host',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    // Garanties a created_at and updated_at column on the created tables
    timestamps: true,
    // use snake_pattern on the created tables
    underscored: true,
    underscoredAll: true,
  },
};
