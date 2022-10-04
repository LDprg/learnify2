import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';

interface PageProp {
    title: string;
    component: React.FC;
}

const Page: React.FC<PageProp> = (that) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{that.title}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{that.title}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <that.component />
            </IonContent>
        </IonPage>
    );
};

export default Page;
