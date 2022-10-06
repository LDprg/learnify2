import "../index.css";
import { IonGrid, IonRow, IonCol, IonInput, IonButton, IonItem, IonLabel, IonCardSubtitle, IonCardHeader, IonCard, IonCardTitle } from '@ionic/react';
import { useSearchSet } from '../../hooks/useApi';

const LearnPage: React.FC = () => {
    const searchSet = useSearchSet();

    const renderSets = () => {
        if (!searchSet.loading || searchSet.data) {
            if (JSON.stringify(searchSet.data).length > 2) {
                return searchSet.data?.map((data: any, index: number) => {
                    return (
                        <IonCard key={index}>
                            <IonCardHeader>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol>
                                            <IonButton expand="block" fill="clear" routerLink={"/Set/" + data._id}>
                                                <IonCardTitle>
                                                    {data.name}
                                                </IonCardTitle>
                                            </IonButton>
                                        </IonCol>
                                        <IonCol>
                                            <IonCardSubtitle>
                                                <IonRow>
                                                    <IonLabel>User: {data.userid}</IonLabel>
                                                </IonRow>
                                                <IonRow>
                                                    <IonLabel>Id: {data._id}</IonLabel>
                                                </IonRow>
                                            </IonCardSubtitle>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCardHeader>
                        </IonCard>
                    );
                });
            }
        }
    }

    return (
        <IonGrid>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel>Search:</IonLabel>
                        <IonInput placeholder="Text" inputMode="search" enterkeyhint="search" onIonChange={e => searchSet.request(e.detail.value!)}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonLabel>
                        {renderSets()}
                    </IonLabel>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default LearnPage;