import { IonButton, IonCard, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonProgressBar } from "@ionic/react";
import React, { useState } from "react";
import {useCamera} from "@capacitor-community/react-hooks/camera"; 
import { CameraResultType } from "@capacitor/core";
import { auth, storage } from "../utils/nhost";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";


const useImageUpload = () => {
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const startUploading = async ({ base64String, filenameWithExtension }: { base64String: string, filenameWithExtension: string }) => {
        try {

        await storage.putString(`/public/${filenameWithExtension}`, base64String, "data_url", null, (pe: ProgressEvent) => {
            setUploadProgress((pe.loaded / pe.total) * 100);
        });
    } catch (e) {
        console.warn(e);
    }
};

    return {
        startUploading,
        uploadProgress
        }
    
    };

const INSERT_POST = gql `
mutation InsertPost($post: posts_insert_input! ){
    insert_posts_one(object: $post){
     title,
     user_id,
     description,
     image_filename
       }
   }
`;

const NewPost = () => {


const {photo, getPhoto} = useCamera();
const {startUploading, uploadProgress} = useImageUpload();
const [insertPostMutation] = useMutation(INSERT_POST);
const [title, setTitle] = useState<string>("");
const [description, setDescription] = useState<string>("");
const [filename, setFilename] = useState<string>("");


const triggerCamera = async () => {
    await getPhoto({
        resultType: CameraResultType.DataUrl,
        quality: 20,
        allowEditing: false 

    });
    setFilename(`${Date.now().toString()}.jpeg`);
};

/*const uploadImage = async () =>{
    filename = `${Date.now().toString()}.jpeg`; 
    await startUploading({
        base64String:  photo?.dataUrl!,
        filenameWithExtension: `${Date.now().toString()}.jpeg`
    })
}*/

//kode fra forelesning nede
const uploadImage = async () =>{

    if (photo?.dataUrl) {
        await startUploading({
            base64String: photo.dataUrl,
            filenameWithExtension: filename

        })
    } else{
        alert ("Du må ta ett bilde!");
    }
   
   // await storage.putString(`/public/${filename}`, (photo?.dataUrl as string), "data_url", null, (pe: ProgressEvent)=>{
    //    console.log(pe.loaded)
  //   })
}

const insertPost = async () => {
    try{
        await insertPostMutation({
            variables: {
                post : {
                    title,
                    description,
                    image_filename: filename,
                    user_id: auth.getClaim('x-hasura-user-id')

                }
            }
        });
    } catch (e) {
        console.log("Feil")
    }
}


        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                            <IonTitle>Nytt innlegg</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonCard>
                        <img src ={photo?.dataUrl}/>
                        <IonList>
                            <IonItem>
                                <IonInput placeholder="Tittel" onIonInput={(e: any) => setTitle(e.target.value)} />
                            </IonItem>
                            <IonItem>
                                <IonInput placeholder="Beskrivelse" onIonInput={(e: any) => setDescription(e.target.value)} />
                            </IonItem>
                        </IonList>
                        <IonButton onClick={triggerCamera}>Ta bilde</IonButton>
                        <IonButton onClick={uploadImage}>Last opp bilde ({filename})</IonButton>
                        <IonButton onClick={insertPost}>Send post</IonButton>
                        <IonProgressBar value={uploadProgress}></IonProgressBar>
                    </IonCard>
                </IonContent>
            </IonPage>
        ); 

};


export default NewPost;


