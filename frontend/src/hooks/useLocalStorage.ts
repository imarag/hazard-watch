const useLocalStorage = <T>(storageKey: string) => {
  function getStorageItem(): T | null {
    try {
      const item = localStorage.getItem(storageKey)
      if (!item) return null
      return JSON.parse(item) as T
    } catch {
      return null
    }
  }

  function setStorageItem(value: T): void {
    localStorage.setItem(storageKey, JSON.stringify(value))
  }

  function deleteStorageItem(): void {
    localStorage.removeItem(storageKey)
  }

  return { getStorageItem, setStorageItem, deleteStorageItem }
}

export default useLocalStorage
