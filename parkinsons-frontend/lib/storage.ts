import type { SavedResult } from "@/types"

const STORAGE_KEY = "parkinsons-detect-saved-results"

export function saveResult(result: SavedResult): void {
  try {
    // Get existing saved results
    const savedResults = getSavedResults()

    // Add new result
    savedResults.push(result)

    // Save back to local storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedResults))
  } catch (error) {
    console.error("Error saving result to local storage:", error)
  }
}

export function getSavedResults(): SavedResult[] {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY)
    return savedData ? JSON.parse(savedData) : []
  } catch (error) {
    console.error("Error retrieving saved results:", error)
    return []
  }
}

export function deleteSavedResult(id: string): void {
  try {
    const savedResults = getSavedResults()
    const updatedResults = savedResults.filter((result) => result.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResults))
  } catch (error) {
    console.error("Error deleting saved result:", error)
  }
}

export function clearAllSavedResults(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Error clearing saved results:", error)
  }
}
