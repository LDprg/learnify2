import { IonAlert, IonButton, IonCol, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonTitle } from "@ionic/react";
import { personCircle } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";
import User from "../../services/User";
import "../index.css";

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [error, setError] = useState<string>();
    const [showAlert, setShowAlert] = useState(false);

    const history = useHistory()

    const register = async (e: any) => {
        e.preventDefault();
        try {
            await User.signUp(email!, username!, password!);
            history.push("/Login");

        } catch (e: any) {
            setError(e.response.data.message);
            setShowAlert(true);
        }
    }

    return (
        <div className='container'>
            <form onSubmit={register}>
                <IonTitle>Register</IonTitle>
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
                    <IonLabel>Username:</IonLabel>
                    <IonInput type="text" placeholder="Username" value={username} onIonChange={e => setUsername(e.detail.value!)} autofocus required></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Password:</IonLabel>
                    <IonInput type="password" placeholder="Password" value={password} onIonChange={e => setPassword(e.detail.value!)} autofocus required></IonInput>
                </IonItem>
                <IonButton type="submit" expand="full">Register</IonButton>
            </form>
        </div>
    );
};

export default RegisterPage;