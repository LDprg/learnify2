import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { useLocation } from 'react-router';
import './ErrorPage.css';

const Page: React.FC = () => {

    const name = useLocation().pathname.split('/')[1];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="container">
                    <strong>{name} not found</strong>
                    <p>Goto <IonRouterLink routerLink="/Home" routerDirection="none">Home</IonRouterLink></p>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Page;
