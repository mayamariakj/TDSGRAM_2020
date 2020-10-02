import React from "react";
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from "@ionic/react";
import IPost from "../models/IPost";

const PostCard = ({ id, title, description, user }: IPost) => {

  return (
    <IonCard>
      <img src="assets/tent-picture.jpeg" alt="tent"/>
      <IonCardHeader>
        <IonCardSubtitle>
          @ {user.display_name} &bull; ? likes
                </IonCardSubtitle>
        <IonCardTitle>
          {title}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {description}
      </IonCardContent>
    </IonCard>
  )
};

export default PostCard;