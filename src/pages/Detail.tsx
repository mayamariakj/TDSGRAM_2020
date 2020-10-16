//import React from "react";
import { IonToolbar, IonPage, IonHeader, IonTitle, IonContent, IonLabel, IonCard, IonList, IonItem, IonAvatar, IonBackButton, IonButtons, IonButton, IonInput, IonIcon } from "@ionic/react";
import PostCard from "../components/PostCard";
import IPost from "../models/IPost";
import { auth, storage } from "../utils/nhost";
import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { trashBinOutline } from "ionicons/icons";

const INSERT_COMMENT = gql`
mutation InsertComment($comment: comments_insert_input!) {
  insert_comments_one(object: $comment) {
    post_id
    user_id
    text
  }
}
`;

const DELETE_POST = gql`
mutation DeletePost($post_id: Int!) {
  delete_comments(
      where: {
        post_id:{
          _eq: $post_id
        }
      }
    ) {
      affected_rows
    }
    delete_posts_by_pk(
      id: $post_id
    ){ id }
  }
`
;

  


const Detail = (props: any) => {


  const post: IPost = props.location?.state?.post;
  const [insertCommentsMutation] = useMutation(INSERT_COMMENT);
  const [deletePostMutation] = useMutation(DELETE_POST);
  const [text, setText] = useState <string> ("");

  if(!post){
    return <div></div>;
  }

const insertComment = async () => {
  try {
    await insertCommentsMutation({
      variables: {
        comment: {
          post_id: post.id,
          user_id: auth.getClaim('x-hasura-user-id'),
          text
        }
      }
    })
  } catch (e) {
    console.log("feil")
  }
}

const deletePost = async () => {
  try {
    await deletePostMutation({
      variables:{
         post_id: post.id
      }
    });
  } catch (e) {
    console.warn(e)
  }
}  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="home"/>
          </IonButtons>
          <IonTitle>Detail View!</IonTitle>
          {
             post.user.id === auth.getClaim('x-hasura-user-id') &&
             <IonButtons slot="end">
             <IonButton onClick={deletePost}>
              <IonIcon color="danger" icon={trashBinOutline}/>
            </IonButton>
          </IonButtons>
          }
          
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PostCard {...post} />
        <IonCard>
          <IonList>
           {post?.comments?.map((Comment, i)=>( 
             
              <IonItem key={i}>
                <IonAvatar slot="start">
                  <img src={Comment.profileImageURL}alt="profileImage"/>
                </IonAvatar>
                <IonLabel>
            <h3>{Comment.date}</h3>
            <h2>{Comment.username}</h2>
            <p>{Comment.text}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonCard>
        <IonCard>
          <IonList>
            <IonItem>
              <IonInput placeholder={"skriv inn en kommentar"} onIonInput= {(e:any) => setText(e.target.value)}/>
               <IonButton onClick={insertComment}>Trykk her</IonButton>
        </IonItem>
        </IonList>
        </IonCard>
      </IonContent>
    </IonPage>
  )

};
export default Detail;