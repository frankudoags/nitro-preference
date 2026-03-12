import { NitroModules } from 'react-native-nitro-modules'
import type { Preference } from './specs/Preference.nitro'

const preference = NitroModules.createHybridObject<Preference>('Preference')

export { preference as Preference }
