const Knex = require('knex')
const knexConf = require('./knexfile.js')

/**
 * Setup DB with migrations.
 */
const setupDB = async (clientConfig) => {
  const knex = getKnex(clientConfig)

  try {
    await migrateTables(knex)
    return { status: true, knex }
  } catch (err) {
    return { status: false, err }
  }
}

/**
 * Get Knex instance.
 */
const getKnex = (clientConf) => {
  const config = getConfig(clientConf)
  const knex = Knex(config)

  return knex
}

/**
 * Combine base config with client conf.
 * Allows client to give own DB details,
 * but keeps our migrations folder.
 */
const getConfig = (clientConf) => {
  const overrides = clientConf

  if (overrides.migrations) {
    delete overrides.migrations
  }

  return { ...knexConf, ...overrides }
}

/**
 * Migrate tables for the data.
 */
const migrateTables = async (knex) => {
  await knex.migrate.latest()
}

/**
 * Insert word rows into db.
 */
const populateDB = async (words, knex) => {
  for (let i = 0; i < words.length; i += 1) {
    const entry = words[i]

    await knex.transaction(async (trx) => {
      try {
        console.log(entry.word)
        const wordID = await trx.insert(entry.word).into('words')

        console.log(wordID)

        for (let j = 0; j < entry.examples.length; j += 1) {
          await trx.insert({ ...entry.examples[j], wordID }).into('examples')
        }
      } catch (err) {
        console.log(err)
        throw err
      }
    })
  }
}

module.exports = {
  setupDB,
  getKnex,
  populateDB,
}
