import type Plyr from "plyr"

export interface PlayerProps {
  src?: string
  type?: "video" | "audio"
  poster?: string
  plyrProps?: Plyr.Options
}
