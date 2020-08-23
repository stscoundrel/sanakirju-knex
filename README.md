# Sanakirju Knex.js

[Knex.js](http://knexjs.org/) / SQL implementation of Sanakirju, a Karelian - Finnish dictionary with over 90 000 words. Based on data from Karjalan Kielen Sanakirja. Example implementation for all Knex supported SQL databases, like PostgreSQL, MySQL, MariaDB or SQLite.

### Install

`yarn add sanakirju-knex`

You also need to install the database driver you're going to use.

```
npm install pg
npm install sqlite3
npm install mysql
npm install mysql2
```

### Usage

The library provides a way to create & populate a database based on your Knex config.


```javascript
const { createDB } = require('sanakirju-knex')

/**
 * Your Knex config file. 
 * NOTE: Leave "migrations" empty.
 */
const knexConf = {...}

const res = await createDB(knexConf)
console.log(res)

```

To query the database, just use Knex as you always would.

```javascript
const Knex = require('knex')

const knexConf = {...}
const knex = Knex(knexConf)

const aWords = await knex('words')
    .where({ startsWith: 'a' })

```

### Sources.

Words & translations are from [Karjalan Kielen Sanakirja](http://kaino.kotus.fi/cgi-bin/kks/kks_etusivu.cgi) created by [Institute for the Languages of Finland](https://www.kotus.fi/en). The original material is licenced under [Creative Commons International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
