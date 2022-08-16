export const filterAndSortEntities = (entities, filter, filterProperty, selectedTags, sortBy) => {
  const filterEntities = (entities) => {
    let filteredEntities = filter
      ? entities.filter((entity) => entity[filterProperty].toLowerCase().includes(filter.toLowerCase()))
      : entities

    selectedTags.forEach((tag) => {
      filteredEntities = filteredEntities.filter((entity) => entity.tags[tag])
    })

    return filteredEntities
  }

  const sortEntities = (entities) => {
    switch (sortBy) {
      case 'name': {
        entities.sort((a, b) => a.name.localeCompare(b.name))
        break
      }
      case 'address': {
        entities.sort((a, b) => a.address.localeCompare(b.address))
        break
      }
      case 'rating': {
        entities.sort((a, b) => b.ratingAverage - a.ratingAverage)
        break
      }
      case 'price': {
        entities.sort((a, b) => a.price - b.price)
        break
      }
      default: {
        break
      }
    }
    return entities
  }

  const filteredEntities = filterEntities(entities)
  const sortedAndFilteredEntities = sortEntities(filteredEntities)
  return sortedAndFilteredEntities
}
