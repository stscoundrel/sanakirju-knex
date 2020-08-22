exports.up = function (knex) {
  return knex.schema
    .createTable('examples', (table) => {
      table.increments('id').primary()
      table.integer('wordID').references('words.id');
      table.string('example')
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('examples')
}
