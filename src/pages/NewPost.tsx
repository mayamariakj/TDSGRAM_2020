import { IonButton, IonCard, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useState } from "react";
import {useCamera} from "@capacitor-community/react-hooks/camera"; 
import { CameraResultType } from "@capacitor/core";
import { storage } from "../utils/nhost";


const useImageUpload = () => {
    const [uploadProgress, setUploadProgress] = useState(0);

    const startUploading = async ({ base64String, filenameWithExtension }: { base64String: string, filenameWithExtension: string }) => {
        await storage.putString(`/public/${filenameWithExtension}`, base64String, "data_url", null, (pe: ProgressEvent) => {
            setUploadProgress((pe.loaded / pe.total) * 100);
        });
    }
    return {
        startUploading,
        uploadProgress
        }
    }


const NewPost = () => {

const {photo, getPhoto} = useCamera();
const {startUploading, uploadProgress} = useImageUpload();

const triggerCamera = async () => {
    await getPhoto({
        resultType: CameraResultType.DataUrl,
        quality: 20,
        allowEditing: false 

    });
};

const uploadImage = async () =>{
    await startUploading({
        base64String:  photo?.dataUrl!,
        filenameWithExtension: `${Date.now().toString()}.jpeg`
    })
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
                        <IonButton onClick={triggerCamera}>Ta bilde</IonButton>
                        <IonButton onClick={uploadImage}>Last opp bilde</IonButton>
                    </IonCard>
                </IonContent>
            </IonPage>
        ); 

};


export default NewPost;