import { type HybridObject } from 'react-native-nitro-modules'

export type StringOutput = string | null
export type NumberOutput = number | null
export type BoolOutput = boolean | null

export type PreferenceEntry = {
  key: string
  stringValue: StringOutput
  numberValue: NumberOutput
  boolValue: BoolOutput
}

/**
 * Preference module for storing key-value pairs of different types (string, number, boolean are supported).
 * Values are stored persistently and can be retrieved across app sessions. The module provides methods to set, get, remove, and clear preferences.
 * Example usage:
 * ```tsx
 * import { Preference } from 'nitro-preferences'
 *
 * // Set a string value
 * await Preference.setString('my_key', 'hello world')
 *
 * // Get a string value
 * const value = await Preference.getString('my_key') // value will be 'hello world'
 *
 * // Set a number value
 * await Preference.setNumber('my_number_key', 42)
 *
 * // Get a number value
 * const numValue = await Preference.getNumber('my_number_key') // numValue will be 42
 *
 * // Set a boolean value
 * await Preference.setBool('my_bool_key', true)
 *
 * // Get a boolean value
 * const boolValue = await Preference.getBool('my_bool_key') // boolValue will be true
 *
 * // Remove a key
 * await Preference.remove('my_key')
 *
 * // Get all preferences *
 * const allPrefs = await Preference.getAll() // allPrefs will be an array of all stored preferences
 *
 * // Clear all preferences
 * await Preference.clear()
 * ```
 */
export interface Preference extends HybridObject<{
  ios: 'swift'
  android: 'kotlin'
}> {
  getString(key: string): Promise<StringOutput>
  setString(key: string, value: string): Promise<void>
  getNumber(key: string): Promise<NumberOutput>
  setNumber(key: string, value: number): Promise<void>
  getBool(key: string): Promise<BoolOutput>
  setBool(key: string, value: boolean): Promise<void>
  remove(key: string): Promise<void>
  getAll(): Promise<PreferenceEntry[]>
  clear(): Promise<void>
}
