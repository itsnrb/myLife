
export function useDataFormatter() {


  const dateFormat = (date) => {
  if (!date) return ''
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}

  return {
    dateFormat,
  };
}
