import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButtons, IonLabel, IonBackButton, IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PostCard from '../components/PostCard';
import IPost from '../models/IPost';
import Icomment from '../models/IComment';
import gql from 'graphql-tag'
import { useQuery } from "@apollo/client";
import IPostList from '../models/IPostList';
import { start } from 'repl';
import {exitOutline} from 'ionicons/icons';
import { auth } from '../utils/nhost';

const GET_POSTS = gql `
query {
  posts {
    description
    image_filename
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

  let history = useHistory();

  const {loading,data } = useQuery<IPostList>(GET_POSTS); 
  if (loading){
    return <IonLabel>Laster...</IonLabel>
  }
 
const logout = async () => {
  try{
    await auth.logout();
    history.replace("/login");
  }catch (e) {
    console.log(e);

  }
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonBackButton defaultHref="/home"/>
          </IonButtons>
          <IonButtons slot={'start'}>
            <IonButton onClick={logout}>
              <IonIcon icon={exitOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>TDSGram</IonTitle>
          <IonButtons slot={'end'}>
            <IonButton routerLink="/newpost">
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
