import { type HybridObject } from 'react-native-nitro-modules'

type StringOutput = string | null
type NumberOutput = number | null
type BoolOutput = boolean | null

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
  clear(): Promise<void>
}
