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

export const getUsersByFieldValue = async ({fieldName, value}) => {
  const response = await client.getEntries({
    content_type: "user",
    [`fields.${fieldName}[match]`]: value
  })

  return response?.items;

}

export const getAllEntriesByType = async (contentType, params) => {

  const response = await client.getEntries({
    content_type: contentType,
    ...[params && params.map(({fieldName, value}) => { 
      console.log("fieldname: ", fieldName)
      console.log("value: ", value)
      return {[`fields.${fieldName}[match]`]: value}
    })]
  })

  return response.items;
}


