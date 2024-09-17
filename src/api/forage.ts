import localforage from 'localforage'

async function saveData(key: string, value: any) {
  try {
    await localforage.setItem(key, JSON.stringify(value))
  }
  catch (e) {
    console.error('Error saving data', e)
  }
}

async function loadData(key: string) {
  try {
    const value = await localforage.getItem(key)
    return JSON.parse(value)
  }
  catch (e) {
    console.error('Error loading data', e)
    return null
  }
}
export {
  saveData,
  loadData,
}
