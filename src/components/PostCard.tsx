import React from "react";
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from "@ionic/react";
import IPost from "../models/IPost";

const PostCard = ({ id, title, description, user, image_filename }: IPost) => {

  return (
    <IonCard>
      <img src={`https://backend-2gcuqdxy.nhost.app/storage/o/public/${image_filename}`}/>
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