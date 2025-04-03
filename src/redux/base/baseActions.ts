export const TRIGGER_SIDEBAROPENDED = 'triggerCollapsed'
export const SET_LANGUAGE = 'setLanguage'
export const ADD_TAGSVIEWLIST = 'addTagsViewList'
export const CHANGE_TAGSVIEW = 'changeTagsView'
export const REMOVE_TAGSVIEW = 'removeTagsView'
export const SET_BREADCRUMBITEMS = 'setBreadcrumbItems'

import { TagsViewItemType, BreadcrumbItemsType } from '@/types/app'
export interface ITriggerCollapsedAction {
  type: typeof TRIGGER_SIDEBAROPENDED
  payload: true | false
}

export interface ISetLanguageAction {
  type: typeof SET_LANGUAGE
  payload: 'zh' | 'en'
}

export interface IAddTagsViewListAction {
  type: typeof ADD_TAGSVIEWLIST
  payload: TagsViewItemType
}

export interface IChangeTagsViewAction {
  type: typeof CHANGE_TAGSVIEW
  payload: { index: string; tag: TagsViewItemType }
}

export interface IRemoveTagsViewAction {
  type: typeof REMOVE_TAGSVIEW
  payload: { type: 'other' | 'right' | 'index'; index: number }
}

export interface ISetBreadcrumbItemsAction {
  type: typeof SET_BREADCRUMBITEMS
  payload: BreadcrumbItemsType[]
}

export type BaseActionTypes =
  | ITriggerCollapsedAction
  | ISetLanguageAction
  | IAddTagsViewListAction
  | IChangeTagsViewAction
  | IRemoveTagsViewAction
  | ISetBreadcrumbItemsAction

export const triggerCollapsedCreator = (
  collapsed: boolean
): ITriggerCollapsedAction => {
  return {
    type: TRIGGER_SIDEBAROPENDED,
    payload: collapsed
  }
}
export const setLanguageCreator = (lang: 'zh' | 'en'): ISetLanguageAction => {
  return {
    type: SET_LANGUAGE,
    payload: lang
  }
}
export const addTagsViewListCreator = (
  tag: TagsViewItemType
): IAddTagsViewListAction => {
  return {
    type: ADD_TAGSVIEWLIST,
    payload: tag
  }
}

export const changeTagsViewCreator = (
  index: string,
  tag: TagsViewItemType
): IChangeTagsViewAction => {
  return {
    type: CHANGE_TAGSVIEW,
    payload: { index, tag }
  }
}

export const removeTagsViewCreator = (
  type: 'other' | 'right' | 'index',
  index: number
): IRemoveTagsViewAction => {
  return {
    type: REMOVE_TAGSVIEW,
    payload: { type, index }
  }
}

export const setBreadcrumbItemsCreator = (
  items: BreadcrumbItemsType[]
): ISetBreadcrumbItemsAction => {
  return {
    type: SET_BREADCRUMBITEMS,
    payload: items
  }
}
