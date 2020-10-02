import React from "react";
import { IonToolbar, IonPage, IonHeader, IonTitle, IonContent, IonLabel, IonCard, IonList, IonItem, IonAvatar, IonBackButton, IonButtons } from "@ionic/react";
import PostCard from "../components/PostCard";
import IPost from "../models/IPost";

const Detail = (props: any) => {

  const post: IPost = props.location?.state?.post;


  if(!post){
    return <div></div>;
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
      </IonContent>
    </IonPage>
  )
};

export default Detail;