import { IonButton, IonInput, IonItem, IonLabel, IonTitle, IonText, IonAlert, IonIcon, IonRow, IonCol } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import React from "react";
import User from "../../services/User";
import "../index.css";

const LoginPage: React.FC = () => {
    const [email, setEmail] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();
    const [error, setError] = React.useState<string>();
    const [showAlert, setShowAlert] = React.useState(false);

    const login = async () => {
        try {
            await User.signIn(email!, password!);
        } catch (e: any) {
            setError(e.response.data.message);
            setShowAlert(true);   
        }
        return await false;
    }

    return (
        <div className='container'>
            <form onSubmit={login} noValidate>
                <IonTitle>Login Page</IonTitle>
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