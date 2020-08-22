const { setupDB, populateDB, getKnex } = require('./database/setup.js')
const dictionary = require('./services/dictionary.js')

/**
 * Create database tables.
 * Insert words into tables.
 */
const createDB = async (clientConf) => {
  try {
    const words = await dictionary.getWords()

    const { knex } = await setupDB(clientConf)

    await populateDB(words, knex)

    knex.destroy()

    return { status: true }
  } catch (err) {
    return { status: false, err }
  }
}

module.exports = {
  getKnex,
  createDB,
}
