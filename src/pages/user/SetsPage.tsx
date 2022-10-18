import "../index.css";
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonRow, IonCol, IonGrid, IonButton, IonIcon, useIonAlert, IonCardSubtitle } from '@ionic/react';
import { useGetUserSet, useCreateSet, useDeleteSet } from '../../hooks/useApi';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { addOutline, addSharp, closeOutline, closeSharp } from "ionicons/icons";

const SetsPage: React.FC = () => {
    const location = useLocation();
    const [presentAlert] = useIonAlert();

    const getUserSet = useGetUserSet();
    const createSet = useCreateSet();
    const deleteSet = useDeleteSet();

    useEffect(() => {
        if (location.pathname === "/Sets")
            getUserSet.request();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const renderSets = () => {
        if (!getUserSet.loading || getUserSet.data) {
            if (JSON.stringify(getUserSet.data).length > 2) {
                return getUserSet.data?.map((data: any, index: number) => {
                    return (
                        <IonCard key={index}>
                            <IonCardHeader>
                                <IonGrid>
                                    <IonRow class="ion-align-items-center">
                                        <IonCol size="4">
                                            <IonButton expand="block" fill="clear" routerLink={"/Set/" + data._id}>
                                                <IonCardTitle>
                                                    {data.name}
                                                </IonCardTitle>
                                            </IonButton>
                                        </IonCol>
                                        <IonCol size="4" className="ion-text-center">
                                            <IonCardSubtitle>
                                                {data.length} Cards
                                            </IonCardSubtitle>
                                        </IonCol>
                                        <IonCol size="4">
                                            <IonButton expand="block" fill="clear" color="danger" onClick={() => {
                                                presentAlert({
                                                    header: "Delete",
                                                    message: "Are you sure you want to delete this item?",
                                                    buttons: [
                                                        {
                                                            text: "No",
                                                        },
                                                        {
                                                            text: "Yes",
                                                            handler: () => {
                                                                deleteSet.request(data._id).then(() => {
                                                                    getUserSet.request();
                                                                });
                                                            }
                                                        }
                                                    ]
                                                });
                                            }}>
                                                <IonIcon slot="icon-only" ios={closeOutline} md={closeSharp}></IonIcon>
                                            </IonButton>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCardHeader>
                        </IonCard>
                    );
                });
            }
            else {
                return <div>No sets found</div>;
            }
        }
    }

    return (
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol class="ion-text-center">
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>
                                    <h3>Your Sets:</h3>
                                </IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        {renderSets()}

                        <IonButton expand="block" fill="clear" onClick={() => {
                            presentAlert({
                                header: 'Name for the new Set',
                                buttons: [
                                    'Cancel',
                                    {
                                        text: 'Create',
                                        handler: (input) => {
                                            createSet.request({ "name": input.name }).then(() => {
                                                getUserSet.request();
                                            });
                                        },
                                    },
                                ],
                                inputs: [
                                    {
                                        name: 'name',
                                        placeholder: 'Name (min 3 characters)',
                                        attributes: {
                                            minlength: 3,
                                        },
                                    }
                                ],
                            });
                        }}>
                            <IonIcon slot="icon-only" ios={addOutline} md={addSharp}></IonIcon>
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    );
};

export default SetsPage;