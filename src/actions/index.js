export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export function selectCategory(name){
    return {
        type: SELECT_CATEGORY,
        name
    }
}