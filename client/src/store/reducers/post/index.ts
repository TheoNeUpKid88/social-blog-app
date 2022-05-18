import {PostActionsEnum, PostsAction, PostSortActions, PostState} from "./types";
import PostService from "../../../services/post-service";

const initialState: PostState = {
    error: '',
    isLoading: false,
    posts: [],
    sortType: PostSortActions.SORT_BY_TIME,
    status: 'idle',
    todayPosts: [],
    currentPage: 1,
    totalPages: 0,
    totalPosts: 0,
    itemCount: 0,
    itemsPerPage: 0
}

export default function postsReducer(state = initialState, action: PostsAction): PostState{
    switch(action.type){
        case PostActionsEnum.SET_ITEMS_PER_PAGE:
            return {...state, itemsPerPage: action.payload}
        case PostActionsEnum.SET_ITEM_COUNT:
            return {...state, itemCount: action.payload}
        case PostActionsEnum.SET_CURRENT_PAGE:
            return {...state, currentPage: action.payload}
        case PostActionsEnum.SET_TOTAL_PAGES:
            return {...state, totalPages: action.payload}
        case PostActionsEnum.SET_TOTAL_POSTS:
            return {...state, totalPosts: action.payload}
        case PostActionsEnum.UPDATE_LIKES:
            return {...state, posts: PostService.updatePostByLike(action.payload, state.posts)}
        case PostActionsEnum.UPDATE_COMMENTS:
            return {...state, posts: PostService.updatePostByComment(action.payload, state.posts)}
        case PostActionsEnum.UPDATE_POSTS:
            return {...state, posts: PostService.updatePostsById(action.payload, state.posts)}
        case PostActionsEnum.ADD_POST:
            return {...state, posts: state.posts.concat(action.payload)}
        case PostActionsEnum.SET_STATUS:
            return {...state, status: action.payload}
        case PostActionsEnum.SET_ERROR:
            return {...state, error: action.payload}
        case PostActionsEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        case PostActionsEnum.SET_POSTS:
            return {...state, posts: action.payload}
        case PostSortActions.SORT_BY_TIME:
            return {...state, sortType: PostSortActions.SORT_BY_TIME, posts: PostService.orderByTime(state.posts)}
        case PostSortActions.SORT_BY_LIKES:
            return {...state, sortType: PostSortActions.SORT_BY_LIKES ,posts: PostService.orderByLikes(state.posts)}
        case PostSortActions.SORT_BY_COMMENTS:
            return {...state, sortType: PostSortActions.SORT_BY_COMMENTS, posts: PostService.orderByComments(state.posts)}
        case PostActionsEnum.SET_TODAY_POSTS:
            return {...state, todayPosts: action.payload}
        default:
            return state
    }
}