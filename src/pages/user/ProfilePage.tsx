import "../index.css";
import { IonCol, IonContent, IonGrid, IonRow, IonLabel, IonItem } from '@ionic/react';
import { useGetUser } from "../../hooks/useApi";
import { useLocation } from "react-router";
import { useEffect } from "react";

const ProfilePage: React.FC = () => {
    const location = useLocation();

    const getUser = useGetUser();

    useEffect(() => {
        if (location.pathname === "/Profile") {
            getUser.request();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    return (
        <IonContent>
            <IonGrid>
                <IonRow class="ion-margin-bottom">
                    <IonCol sizeMd="4" sizeXs="12">
                        <IonItem>
                            <IonLabel>User:</IonLabel>
                        </IonItem>
                    </IonCol>
                    <IonCol sizeMd="8" sizeXs="12">
                        <IonItem>
                            <IonLabel>{getUser.data?.username}</IonLabel>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow class="ion-margin-bottom">
                    <IonCol sizeMd="4" sizeXs="12">
                        <IonItem>
                            <IonLabel>Email:</IonLabel>
                        </IonItem>
                    </IonCol>
                    <IonCol sizeMd="8" sizeXs="12">
                        <IonItem>
                            <IonLabel>{getUser.data?.email}</IonLabel>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow class="ion-margin-bottom">
                    <IonCol sizeMd="4" sizeXs="12">
                        <IonItem>
                            <IonLabel>UserId:</IonLabel>
                        </IonItem>
                    </IonCol>
                    <IonCol sizeMd="8" sizeXs="12">
                        <IonItem>
                            <IonLabel>{getUser.data?.id}</IonLabel>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    );
};

export default ProfilePage;