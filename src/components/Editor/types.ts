export interface EditorProps {
  placeholder?: string
  readonly?: boolean
  autofocus?: boolean
  uploadImage?: (file: File) => Promise<string>
  uploadVideo?: (file: File) => Promise<string>
  uploadAudio?: (file: File) => Promise<string>
}
