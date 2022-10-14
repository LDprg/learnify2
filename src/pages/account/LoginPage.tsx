import { IonButton, IonInput, IonItem, IonLabel, IonTitle, IonAlert, IonIcon, IonRow, IonCol } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import React, { useState } from "react";
import { useHistory } from 'react-router';
import "../index.css";
import { useEffect } from 'react';
import { useGetUser, useSignInGlobal } from '../../hooks/useApi';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [error, setError] = useState<string>();
    const [showAlert, setShowAlert] = useState(false);

    const history = useHistory();
    const signIn = useSignInGlobal();
    const getUser = useGetUser();

    const login = async (e: any) => {
        e.preventDefault();
        try {
            signIn.request(email!, password!);
        } catch (e: any) {
            setError(signIn.error);
            setShowAlert(true);
        }
    }

    useEffect(() => {
        if (signIn.data){
            getUser.request();
            history.push("/Home");
        }
        if (signIn.error) {
            setError(JSON.stringify(signIn.error));
            setShowAlert(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history, signIn.data, signIn.error]);

    return (
        <div className='container'>
            <form onSubmit={login}>
                <IonTitle>Login</IonTitle>
                <IonRow>
                    <IonCol>
                        <IonIcon
                            style={{ fontSize: "70px", color: "#0040ff" }}
                            icon={personCircle}
                        />
                    </IonCol>
                </IonRow>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header="Error"
                    subHeader="Login Failed"
                    message={error}
                    buttons={['OK']}
                />
                <IonItem>
                    <IonLabel>Email:</IonLabel>
                    <IonInput type="email" placeholder="Email" value={email} onIonChange={e => setEmail(e.detail.value!)} autofocus required></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Password:</IonLabel>
                    <IonInput type="password" placeholder="Password" value={password} onIonChange={e => setPassword(e.detail.value!)} autofocus required></IonInput>
                </IonItem>
                <IonButton type="submit" expand="full">Login</IonButton>
            </form>
        </div>
    );
};

export default LoginPage;