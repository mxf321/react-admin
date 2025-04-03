import i18n from '@/i18n/configs'
import {
  TRIGGER_SIDEBAROPENDED,
  SET_LANGUAGE,
  ADD_TAGSVIEWLIST,
  CHANGE_TAGSVIEW,
  REMOVE_TAGSVIEW,
  SET_BREADCRUMBITEMS,
  BaseActionTypes
} from './baseActions'
import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW, DEFAULT_LANG, BREADCRUMB_ITEMS } from '@/constant'
import { TagsViewItemType, BreadcrumbItemsType } from '@/types/app'

export interface BaseState {
  language: 'zh' | 'en'
  collapsed: boolean
  tagsViewList: []
  breadcrumbItems: BreadcrumbItemsType[]
}

const defaultState: BaseState = {
  language: getItem(LANG) || DEFAULT_LANG,
  collapsed: false,
  tagsViewList: getItem(TAGS_VIEW) || [],
  breadcrumbItems: []
}
const isFind = (tagsViewList: TagsViewItemType[], path: string) => {
  return tagsViewList.find((item) => item.fullPath === path)
}

export const baseReducer = (state = defaultState, action: BaseActionTypes) => {
  switch (action.type) {
    case TRIGGER_SIDEBAROPENDED:
      return { ...state, collapsed: action.payload }
    case SET_LANGUAGE:
      // 一定得加上这句
      i18n.changeLanguage(action.payload)
      setItem(LANG, action.payload)
      return { ...state, language: action.payload }
    case ADD_TAGSVIEWLIST:
      // 处理重复
      if (!isFind(state.tagsViewList, action.payload.fullPath)) {
        setItem(TAGS_VIEW, [...state.tagsViewList, action.payload])
        return {
          ...state,
          tagsViewList: [...state.tagsViewList, action.payload]
        }
      } else {
        return { ...state }
      }
    case CHANGE_TAGSVIEW:
      state.tagsViewList[action.payload.index] = action.payload.tag
      setItem(TAGS_VIEW, state.tagsViewList)
      return { ...state, tagsViewList: state.tagsViewList }
    case REMOVE_TAGSVIEW:
      switch (action.payload.type) {
        case 'index':
          setItem(
            TAGS_VIEW,
            state.tagsViewList.filter((tag, i) => i !== action.payload.index)
          )

          return {
            ...state,
            tagsViewList: state.tagsViewList.filter(
              (tag, i) => i !== action.payload.index
            )
          }
        case 'other':
          setItem(
            TAGS_VIEW,
            state.tagsViewList.filter((tag, i) => i === action.payload.index)
          )

          return {
            ...state,
            tagsViewList: state.tagsViewList.filter(
              (tag, i) => i === action.payload.index
            )
          }
        case 'right':
          setItem(
            TAGS_VIEW,
            state.tagsViewList.filter((tag, i) => i < action.payload.index + 1)
          )

          return {
            ...state,
            tagsViewList: state.tagsViewList.filter(
              (tag, i) => i < action.payload.index + 1
            )
          }
        default:
          return state
      }
    case SET_BREADCRUMBITEMS:
      setItem(BREADCRUMB_ITEMS, action.payload)
      return { ...state, breadcrumbItems: action.payload }

    default:
      return state
  }
}
