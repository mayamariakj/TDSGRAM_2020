import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButtons, IonLabel } from '@ionic/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import IPost from '../models/IPost';
import Icomment from '../models/IComment';
import gql from 'graphql-tag'
import { useQuery } from "@apollo/client";
import IPostList from '../models/IPostList';

const GET_POSTS = gql `
query {
  posts {
    description
    title
    id
    user{
      display_name
    }
    comments{
      id
      text
      user{
        display_name
      }
    } 
  }
}


`;

const Home = () => {

  const {loading,data } = useQuery<IPostList>(GET_POSTS); 
  if (loading){
    return <IonLabel>Laster...</IonLabel>
  }
 


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>TDSGram</IonTitle>
          <IonButtons slot={'end'}>
            <IonButton>
              +
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    <IonContent fullscreen>
        {
          data?.posts.map(post => (
            <Link style={{ textDecoration: 'none' }} key={post.id} to={{
              pathname: `/detail/${post.id}`,
              state: {
                post
              }
            }}>
              <PostCard {...post} />
            </Link>
          ))
        }
      </IonContent>
    </IonPage>
  );
};


export default Home;
