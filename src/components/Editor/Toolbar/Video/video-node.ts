import { mergeAttributes, Node } from "@tiptap/core"
import { VueNodeViewRenderer } from "@tiptap/vue-3"

import VideoNodeView from "./VideoNodeView.vue"

export const VideoNode = Node.create({
  name: "video",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: element => element.getAttribute("data-src"),
        renderHTML: attrs => ({ "data-src": attrs.src }),
      },
      poster: {
        default: null,
        parseHTML: element => element.getAttribute("data-poster"),
        renderHTML: attrs => (attrs.poster ? { "data-poster": attrs.poster } : {}),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="video"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes({ "data-type": "video" }, HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(VideoNodeView)
  },
})
