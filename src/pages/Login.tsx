import React, { useState } from "react";
import { IonToast,IonSpinner,IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonList, IonItem, IonInput, IonButton, useIonViewWillEnter, IonFabButton, IonIcon } from "@ionic/react";
import { auth } from "../utils/nhost";
import { useHistory } from "react-router-dom";
import styled from "styled-components"; 
import { arrowForwardCircle } from "ionicons/icons";
import {renderToStaticMarkup} from "react-dom/server";
import WaveBlob from "../components/WavwBlob";

const waveBlobString = encodeURIComponent (renderToStaticMarkup(<WaveBlob />))

const Login = () => {
    let history = useHistory();
    const [emailAddress, setEmailAddress] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
    const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

    useIonViewWillEnter(() =>{
        if(auth.isAuthenticated()){
            history.replace("/home");
        }
    });

    const autenticateUser = async () => { 
        setIsAuthenticating(true); 
        try{ 
        await auth.login(emailAddress,password);
        setIsAuthenticating(false);
        history.replace("/home"); 
        }catch(exeption){
        console.error(exeption);
        setIsAuthenticating(false);
        setShowErrorToast(true);

        }
    }

    return (
        <IonPage>
             <IonContentStyled>
                 <CenterContainer>
                     <PageTitle>TDSGram</PageTitle>
                 <LoginCard>
                     <IonList>
                         <IonItem>
                             <IonInput placeholder="Epostadresse" onIonInput={(e:any)=> setEmailAddress(e.target.value)}/> 
                         </IonItem>
                         <IonItem>
                             <IonInput placeholder="Passord" type="password" onIonInput={(e:any)=> setPassword(e.target.value)}/>
                         </IonItem>
                     </IonList>
                 </LoginCard>
                 <LoginButton onClick={autenticateUser}>
                     {
                         isAuthenticating ?
                         <IonSpinner name="crescent" /> :
                         <IonIcon icon={arrowForwardCircle}/>
                     } 
                </LoginButton>
                <IonButton onClick={() =>  history.replace("/register")}> {/*=>  history.replace("/registeruser")}>*/}
                    Registrer deg
                </IonButton>
                </CenterContainer>
                <IonToast
                isOpen={showErrorToast}
                onDidDismiss={() => setShowErrorToast(false)}
                message="feil brukernavn/passord. "
                duration={3000}
                color = "warning"
                />
             </IonContentStyled>
        </IonPage>
    );

};

const LoginCard = styled(IonCard)`
padding: 20px;

`;

const IonContentStyled = styled(IonContent)`
--background: none;
background: url("data:image/svg+xml, ${waveBlobString}") no-repeat fixed;
background-size: cover;
background-color: white;
`;

const PageTitle = styled.h1`
font-size: 3em;
align-self: center;
color: #37323E; 
font-family: 'Quicksand', sans-serif;
`;


const LoginButton = styled(IonFabButton)`
--background : #37323E;
align-self: center;
`;

const CenterContainer = styled.div `
display: flex;
justify-content: center;
flex-direction: column;  
height: 100%;
`;

export default Login;