import { mergeAttributes, Node } from "@tiptap/core"
import { VueNodeViewRenderer } from "@tiptap/vue-3"

import AudioNodeView from "./AudioNodeView.vue"

export const AudioNode = Node.create({
  name: "audio",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: element => element.getAttribute("data-src"),
        renderHTML: attrs => ({ "data-src": attrs.src }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="audio"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes({ "data-type": "audio" }, HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(AudioNodeView)
  },
})
