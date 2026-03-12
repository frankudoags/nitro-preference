import { type HybridObject } from 'react-native-nitro-modules'

export interface Preference extends HybridObject<{
  ios: 'swift'
  android: 'kotlin'
}> {
  getString(key: string): Promise<string | null>
  setString(key: string, value: string): Promise<void>
  getNumber(key: string): Promise<number | null>
  setNumber(key: string, value: number): Promise<void>
  getBool(key: string): Promise<boolean | null>
  setBool(key: string, value: boolean): Promise<void>
  remove(key: string): Promise<void>
  clear(): Promise<void>
}
