import "./index.css";
import { IonContent, IonRow, IonCol, IonGrid, IonCard, IonCardHeader, IonCardTitle, IonLabel, IonItem, IonIcon, IonButton } from '@ionic/react';
import { useParams } from "react-router";
import { useGetSet } from "../hooks/useApi";
import { useEffect } from "react";
import { pencilOutline, pencilSharp } from "ionicons/icons";

interface SetPageProps {
    id: string;
}

const SetsPage: React.FC = () => {
    const { id } = useParams<SetPageProps>();

    const getSet = useGetSet();

    useEffect(() => {
        getSet.request(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const renderSet = () => {
        if (getSet.loading) {
            return (
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <h4>Set:</h4>
                            <h4>User:</h4>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            );
        }
        else if (getSet.data) {
            if (JSON.stringify(getSet.data.data).length > 2) {
                return (
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <h4>Set: {getSet.data.name}</h4>
                                <h4>User: {getSet.data.userid}</h4>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                {getSet.data?.data.map((data: any, index: number) => {
                                    return (
                                        <IonCard key={index}>
                                            <IonCardHeader>
                                                <IonCardTitle>
                                                    <IonItem>
                                                        <IonLabel slot="start">{data.first}</IonLabel>
                                                        <IonLabel slot="">{data.second}</IonLabel>
                                                        <IonButton fill="clear">
                                                            <IonIcon slot="icon-only" ios={pencilOutline} md={pencilSharp}>Edit</IonIcon>
                                                        </IonButton>
                                                    </IonItem>
                                                </IonCardTitle>
                                            </IonCardHeader>
                                        </IonCard>
                                    );
                                })}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                );
            }
            else {
                return (
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <h4>Set: {getSet.data.name}</h4>
                                <h4>User: {getSet.data.userid}</h4>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <h4>Cards not found</h4>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                );
            }
        }
        else {
            return (
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <h4>Set not found</h4>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            );
        }
    }

    return (
        <IonContent>
            {renderSet()}
        </IonContent>
    );
};

export default SetsPage;