
import { SlateDescendant } from '@wangeditor/editor'

declare module '@wangeditor/editor' {
    // 扩展 Text
    interface SlateText {
        text: string
    }

    // 扩展 Element
    interface SlateElement {
        type: string
        children: SlateDescendant[]
    }
}
declare module '@wangeditor/editor-for-vue' {
    const Editor: any;
    const Toolbar: any;
    type IEditorConfig = any;
  }
  