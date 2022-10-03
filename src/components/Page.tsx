import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Route } from 'react-router';

interface PageProp{
    url: string;
    title: string;
    component: React.FC;
}

const Page: React.FC<PageProp> = (that) => {
    return (
        <Route path={that.url} exact={true}>
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
        </Route>
    );
};

export default Page;
