import { IonPage, IonList, IonItem, IonInput, IonButton, IonToast, IonCard, IonContent, useIonViewWillEnter, IonTitle } from "@ionic/react";
import { register } from "../serviceWorker";
import { auth } from "../utils/nhost";
import { useHistory } from "react-router";
import React, { useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import styled from "styled-components";
import WaveBlob from "../components/WavwBlob";

const waveBlobString = encodeURIComponent(renderToStaticMarkup(<WaveBlob />));



const Register = () => {
    let history = useHistory();
    const [emailAddress, setEmailAddress] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isNewUser, setIsNewUser] = useState<boolean>(false)
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
    const [showErrorToast, setShowErrorToast] = useState<boolean>(false);


    const register = async () => { 
        setIsNewUser(true); 
        try{ 
        await auth.register(emailAddress,password);
        history.replace("/home"); 
        }catch(exeption){
        console.error(exeption);
        setShowErrorToast(true);

        }
    }
    return (
        <IonPage>
          <IonContentStyled>
            <CenterContainer>
              <IonTitle>Opprett profil</IonTitle>
              <LoginCard>
                <IonList>
                  <IonItem>
                    <IonInput placeholder="Epostadresse" onIonInput={(e: any) => setEmailAddress(e.target.value)} />
                  </IonItem>
                  <IonItem>
                    <IonInput placeholder="Passord" type="password" onIonInput={(e: any) => setPassword(e.target.value)} />
                  </IonItem>
                </IonList>
              </LoginCard>
              <IonButton onClick={register}>
                Register deg</IonButton>
            </CenterContainer>
            <IonToast
              isOpen={showErrorToast}
              onDidDismiss={() => setShowErrorToast(false)}
              message="Bruker ekister allerede/mangler passord"
              duration={3000}
              color="warning"
            />
          </IonContentStyled>
        </IonPage>
      )
    };
    const LoginCard = styled(IonCard)`
padding: 20px;
background-color: black;
`;

const IonContentStyled = styled(IonContent)`
--background: none;
background: url("data:image/svg+xml, ${waveBlobString}") no-repeat fixed;
background-size: cover;
background-color: white;
`;

const CenterContainer = styled.div`
display: flex; 
justify-content: center; 
flex-direction: column; 
height: 100%;
`;

const PageTitle = styled.h1`
font-size: 3em; 
align-self: center;
color: #37323E;
font-family: 'Quicksand', sans-serif;
`;

export default Register;