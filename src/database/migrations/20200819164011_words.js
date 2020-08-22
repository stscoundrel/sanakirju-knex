exports.up = function (knex) {
  return knex.schema
    .createTable('words', (table) => {
      table.increments('id').primary()
      table.string('word')
      table.string('definition')
      table.string('startsWith')
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('words')
}
