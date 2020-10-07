//import React from "react";
import { IonToolbar, IonPage, IonHeader, IonTitle, IonContent, IonLabel, IonCard, IonList, IonItem, IonAvatar, IonBackButton, IonButtons, IonButton, IonInput } from "@ionic/react";
import PostCard from "../components/PostCard";
import IPost from "../models/IPost";
import { auth, storage } from "../utils/nhost";
import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

const INSERT_COMMENT = gql`
mutation InsertComment($comment: comments_insert_input!) {
  insert_comments_one(object: $comment) {
    post_id
    user_id
    text
  }
}
`;


const Detail = (props: any) => {


  const post: IPost = props.location?.state?.post;
  const [insertCommentsMutation] = useMutation(INSERT_COMMENT);
  const [text, setText] = useState <string> ("");

  if(!post){
    return <div></div>;
  }
//prøver men failer 

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

  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>Detail View!</IonTitle>
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