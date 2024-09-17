const getProjectsContainerRows = (count: number) => {
  if (count === 1) {
    return "grid-rows-1"
  } else if (count === 2) {
    return "grid-rows-2"
  } else {
    return "grid-rows-3"
  }
}

export default getProjectsContainerRows
