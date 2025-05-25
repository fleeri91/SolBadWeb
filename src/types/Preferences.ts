import { Coordinates } from './Coordinates'
import { Transport } from './Transport'

export interface Preferences {
  distance: number
  position: Coordinates
  transport: Transport
}
