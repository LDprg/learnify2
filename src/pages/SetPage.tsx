import "./index.css";
import { IonContent, IonRow, IonCol, IonGrid, IonCard, IonCardHeader, IonCardTitle, IonLabel, IonIcon, IonButton, IonInput, useIonAlert, IonItem } from '@ionic/react';
import { useParams } from "react-router";
import { useGetSet, useGetUser, useUpdateSet } from '../hooks/useApi';
import { useEffect, useState } from "react";
import { addOutline, addSharp, checkmarkOutline, checkmarkSharp, closeOutline, closeSharp, pencilOutline, pencilSharp } from "ionicons/icons";

interface SetPageProps {
    id: string;
}

const SetsPage: React.FC = () => {
    const { id } = useParams<SetPageProps>();

    const [presentAlert] = useIonAlert();

    const getSet = useGetSet();
    const getUser = useGetUser();
    const updateSet = useUpdateSet();

    const [edit, setEdit] = useState(false);
    const [item, setItem] = useState("");
    const [newData, setNewData] = useState<any>({});

    useEffect(() => {
        getSet.request(id);
        getUser.request();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const renderUser = (data: any) => {
        if (getSet.data?.userid === getUser.data?.id && !edit) {
            return (
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonLabel>{data?.first}</IonLabel>
                        </IonCol>
                        <IonCol >
                            <IonLabel>{data?.second}</IonLabel>
                        </IonCol>
                        <IonCol size="1">
                            <IonButton expand="block" fill="clear" color="danger" onClick={() => {
                                for (const item of getSet.data?.data) {
                                    if (data?._id === item._id) {
                                        presentAlert({
                                            header: "Delete",
                                            message: "Are you sure you want to delete this Set?",
                                            buttons: [
                                                {
                                                    text: "No",
                                                },
                                                {
                                                    text: "Yes",
                                                    handler: () => {
                                                        getSet.data?.data.splice(getSet.data?.data.indexOf(item), 1);
                                                        updateSet.request(id, getSet.data).then(() => {
                                                            getSet.request(id);
                                                        });
                                                    }
                                                }
                                            ]
                                        });
                                        break;
                                    }
                                }
                            }}>
                                <IonIcon slot="icon-only" ios={closeOutline} md={closeSharp}></IonIcon>
                            </IonButton>
                        </IonCol>
                        <IonCol size="1">
                            <IonButton expand="block" fill="clear" onClick={() => {
                                setNewData(data);
                                setItem(data?._id);
                                setEdit(true);
                            }}>
                                <IonIcon slot="icon-only" ios={pencilOutline} md={pencilSharp}></IonIcon>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            );
        }
        else if (getSet.data?.userid === getUser.data?.id && edit && item === data._id) {
            return (
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonInput value={newData.first} placeholder="Value" onIonChange={(e) => {
                                    setNewData({ ...newData, first: e.detail.value });
                                }}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol >
                            <IonItem>
                                <IonInput value={newData.second} placeholder="Key" onIonChange={(e) => {
                                    setNewData({ ...newData, second: e.detail.value });
                                }}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size="1">
                            <IonButton expand="block" fill="clear" color="danger" onClick={() => {
                                setNewData({});
                                setEdit(false);
                                setItem("");
                            }}>
                                <IonIcon slot="icon-only" ios={closeOutline} md={closeSharp}></IonIcon>
                            </IonButton>
                        </IonCol>
                        <IonCol size="1">
                            <IonButton expand="block" fill="clear" onClick={() => {
                                for (const item of getSet.data?.data) {
                                    if (newData._id === item._id) {
                                        item.first = newData.first.trim();
                                        item.second = newData.second.trim();
                                    }
                                }

                                updateSet.request(id, getSet.data).then(() => {
                                    getSet.request(id);
                                });

                                setNewData({});
                                setEdit(false);
                                setItem("");
                            }}>
                                <IonIcon slot="icon-only" ios={checkmarkOutline} md={checkmarkSharp}></IonIcon>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            );
        } else {
            return (
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonLabel>{data.first}</IonLabel>
                        </IonCol>
                        <IonCol>
                            <IonLabel>{data.second}</IonLabel>
                        </IonCol>
                        <IonCol size="1">
                            <IonButton expand="block" fill="clear" color="danger" disabled>
                                <IonIcon slot="icon-only" ios={closeOutline} md={closeSharp}></IonIcon>
                            </IonButton>
                        </IonCol>
                        <IonCol size="1">
                            <IonButton expand="block" fill="clear" disabled>
                                <IonIcon slot="icon-only" ios={pencilOutline} md={pencilSharp}></IonIcon>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            );
        }
    }

    const renderSet = () => {
        if (!getSet.data && getSet.loading) {
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
                        <IonRow class="ion-align-items-center">
                            <IonCol>
                                <h4>Set: {getSet.data?.name}</h4>
                                <h4>User: {getSet.data?.userid}</h4>
                            </IonCol>
                            <IonCol>
                                <IonCard routerLink={"/Set/" + id + "/Learn"} routerDirection="none">
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            <div className="ion-text-center">
                                                Learn
                                            </div>
                                        </IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                {getSet.data?.data.map((data: any, index: number) => {
                                    return (
                                        <IonCard key={index}>
                                            <IonCardHeader>
                                                <IonCardTitle>
                                                    {renderUser(data)}
                                                </IonCardTitle>
                                            </IonCardHeader>
                                        </IonCard>
                                    );
                                })}
                                <IonButton expand="block" fill="clear" onClick={() => {
                                    getSet.data?.data.push({ first: "", second: "" });

                                    updateSet.request(id, getSet.data).then(() => {
                                        getSet.request(id);
                                    });
                                }} disabled={getSet.data?.userid !== getUser.data?.id || !getUser.data}>
                                    <IonIcon slot="icon-only" ios={addOutline} md={addSharp}></IonIcon>
                                </IonButton>
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
                                <h4 className="ion-text-center">Cards not found</h4>
                                <IonButton expand="block" fill="clear" onClick={() => {
                                    getSet.data?.data.push({ first: "", second: "" });

                                    updateSet.request(id, getSet.data).then(() => {
                                        getSet.request(id);
                                    });
                                }}>
                                    <IonIcon slot="icon-only" ios={addOutline} md={addSharp}></IonIcon>
                                </IonButton>
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