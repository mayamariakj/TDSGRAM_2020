import IComment from "./IComment";

interface IPost {
    id: number;
    title: string;
    description: string;
    image_filename: string,
    user : {
        display_name : string;
    },
    likes: number;
    comments: IComment[];
    image: string;
    
};

export default IPost;