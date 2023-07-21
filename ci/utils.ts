export function capitalizeFirstLetter(str: string, type?: 'lower' | 'upper') {
  if (type === 'upper') {
    return str.charAt(0).toUpperCase() + str.slice(1)
  } else {
    return str.charAt(0).toLowerCase() + str.slice(1)
  }
}
