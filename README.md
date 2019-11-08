# cargurus-id-generator

Grab CARGURUS vehicle ID's from the cargurus backend API for specific keywords

[![npm version](https://badge.fury.io/js/cargurus-id-generator.svg)](https://badge.fury.io/js/cargurus-id-generator)

## Implementation
```
const gen = require('cargurus-id-generator');

async function fetch(kw) {
  let query = await gen('prius');
  return query;
}
```

## Example output
![image](https://i.imgur.com/czCPtfb.png)
