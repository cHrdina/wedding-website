const contentful = require("contentful");

export 
  const client = contentful.createClient({
  space: '96gs931fj8v7',
  accessToken: 'gXl5Krmpbwbm_9534OOsI8urrKT4CNXqXxvetKNiFLE'
})

export const getEntryById = async (id) => {
  return client.getEntry(
    id
  )
}

export const getAllEntriesByType = async (contentType) => {
  return client.getEntries({
    content_type: contentType
  })
}


