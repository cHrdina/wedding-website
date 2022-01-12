

const contentful = require("contentful");
const management = require("contentful-management")

const spaceId = "96gs931fj8v7";

export 
  const client = contentful.createClient({
  space: spaceId,
  accessToken: 'gXl5Krmpbwbm_9534OOsI8urrKT4CNXqXxvetKNiFLE'
})

export const managementClient = management.createClient({
  accessToken: 'CFPAT-dhn0I6zOdQJaHcEDBLRR0lwj90YMp6Ej_0PRIeTJQXg',
  space: spaceId,
  environment: "master"
})


export const getEntryById = async (id) => {
  return client.getEntry(
    id
  )
}

export const getAssetById = async (id) => {
  return client.getAsset(id);
}

export const getContentTypeById = async (id) => {
  return client.getContentType(id);
}

export const getEntryById_mgmt = async (id) => {
  const entry = await managementClient.getSpace(spaceId)
  .then((space) => space.getEnvironment('master'))
  .then((environment) => environment.getEntry(id))
  .then((entry) => entry);

  return entry;
}

export const createEntry = async (contentType, fields) => {
  const entry = await managementClient.getSpace(spaceId)
  .then((space) => space.getEnvironment('master'))
  .then((environment) => environment.createEntry(contentType, { fields: {
    suggestedBy: {"en-US": {sys: {type: "Link", linkType: "Entry", id: fields.suggestedBy}}}, 
    suggestion: { "en-US": fields.suggestion}
  }
  }))

  await entry.publish()

  return entry;
}

export const updateEntry = async (id, updateObj) => {
  const entry = await getEntryById_mgmt(id);

  console.log("will update entry", entry)
  console.log("with updates", updateObj)

  Object.entries(updateObj).forEach(([fieldName, value]) => {
    entry.fields[fieldName] = {"en-US": value};
  })

  const updatedEntry = await entry.update()

  const publishedEntry = await updatedEntry.publish();
  console.log("PUBLISHED", publishedEntry)

  return updatedEntry;
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
    ...params

  })

  return response.items;
}


export const getMemories = async() => {
  const allMemories = await getAllEntriesByType("memory", {order: "fields.order"});
  return allMemories;
}

export const getFaqs = async() => {
  const allFaqs = await getAllEntriesByType("faq", {order: "fields.order"});
  return allFaqs;
}

export const getSongSuggestionsForUser = async(userId) => {
  const response = await getAllEntriesByType("songSuggestion", {
  'fields.suggestedBy.sys.id': userId,
  });
  return response;
}

export const createSongSuggestion = async (userId, suggestion) => {
  console.log(suggestion)
  const response = await createEntry("songSuggestion", {suggestedBy: userId, suggestion: suggestion});
  return response;
}
export const createHoneymoonSuggestion = async (userId, suggestion) => {
  console.log(suggestion)
  const response = await createEntry("honeymoonSuggestion", {suggestedBy: userId, suggestion: suggestion});
  return response;
}

export const getHoneymoonSuggestionsForUser = async(userId) => {
  const response = await getAllEntriesByType("honeymoonSuggestion", {
  'fields.suggestedBy.sys.id': userId,
  });
  return response;
}

export const getValidations = async (contentType) => {

  const response = await getAllEntriesByType(contentType);
  return response.validations;

}


