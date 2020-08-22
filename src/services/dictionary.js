const sanakirju = require('sanakirju')

/**
 * Return dictionary words.
 * Format to fit DB schema.
 */
const getWords = async () => {
  const entries = await sanakirju.fromXML()

  const words = formatEntries(entries)

  return words
}

/**
 * Formats dictionary for DB Schema.
 * Sanakirju entries may have multiple meanings,
 * treat them as individual words.
 */
const formatEntries = (entries) => {
  const formattedEntries = []

  for (let i = 0; i < entries.length; i += 1) {
    entries[i].definitions.forEach((definition) => {
      formattedEntries.push(formatEntry(entries[i].word, definition))
    })
  }

  return formattedEntries
}

/**
 * Format individual entry.
 */
const formatEntry = (word, definition) => ({
  word: {
    word,
    definition: formatDefinition(definition.definition),
    startsWith: word.charAt(0),
  },
  examples: formatExamples(definition.examples),
})

/**
 * Some definitions are empty arrays.
 * Swap to empty strings.
 */
const formatDefinition = (definition) => {
  if (typeof definition !== 'string') {
    return ''
  }

  return definition
}

/**
 * Format examples to look like their model.
 */
const formatExamples = (examples) => examples.map((example) => ({
  example,
}))

module.exports = {
  getWords,
}
