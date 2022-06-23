import React, {FC} from 'react';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import './editPostButtons.scss'
import PostService from "../../services/post-service";
import {removePost} from "../../store/reducers/post/action-creators";
import {deletePost} from "../../store/reducers/auth/action-creators";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {IPost} from "../../types/post-type";

const EditPostButtons: FC<{post: IPost}> = ({post}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleUpdate = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        navigate(`/edit/${post.id}`)
    }
    const handleDelete = async (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        try{
            await PostService.deletePost(post.id)
            dispatch(removePost(post.id))
            dispatch(deletePost(post))
        }catch(e){
            console.log(e)
        }
    }
    return (
        <div className={'postUpdateActions'}>
            <div onClick={handleUpdate} className={'postUpdate edit'}>
                <EditIcon className={'postUpdateIcon'}/>
                <span>Edit</span>
            </div>
            <div onClick={handleDelete} className={'postUpdate delete'}>
                <DeleteIcon className={'postUpdateIcon'}/>
                <span>Delete</span>
            </div>
        </div>
    );
};

export default EditPostButtons;