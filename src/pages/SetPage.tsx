import "./index.css";
import { IonContent, IonRow, IonCol, IonGrid, IonCard, IonCardHeader, IonCardTitle, IonLabel, IonIcon, IonButton, IonInput, useIonAlert, IonItem } from '@ionic/react';
import { useLocation, useParams } from "react-router";
import { useGetSet, useGetUser, useGetUserStatShort, useUpdateSet } from '../hooks/useApi';
import { useEffect, useState } from "react";
import { addOutline, addSharp, checkmarkOutline, checkmarkSharp, closeOutline, closeSharp, pencilOutline, pencilSharp, trendingDownOutline, trendingDownSharp, trendingUpOutline, trendingUpSharp } from "ionicons/icons";
interface SetPageProps {
    id: string;
}

const SetsPage: React.FC = () => {
    const { id } = useParams<SetPageProps>();

    const location = useLocation();

    const [presentAlert] = useIonAlert();

    const getSet = useGetSet();
    const getUser = useGetUser();
    const updateSet = useUpdateSet();
    const getUserStatShort = useGetUserStatShort();

    const [edit, setEdit] = useState(false);
    const [item, setItem] = useState("");
    const [newData, setNewData] = useState<any>({});

    useEffect(() => {
        if (location.pathname === "/Set/" + id) {
            getUser.request();
            getSet.request(id);            
            getUserStatShort.request(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, id]);

    const getStat = (data: any) => {
        console.log(getUserStatShort.data?.data.find((value: any) => value.cardid === data?._id));
        return getUserStatShort.data?.data.find((value: any) => value.cardid === data?._id)?.stat;
    }

    const renderUser = (data: any) => {
        if (getSet.data?.userid === getUser.data?.id && !edit) {
            return (
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <h2>{data?.first}</h2>
                            </IonItem>
                        </IonCol>
                        <IonCol >
                            <IonItem>
                                <h2>{data?.second}</h2>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonIcon color={"success"} ios={trendingUpOutline} md={trendingUpSharp}></IonIcon>
                                &nbsp;
                                <IonLabel>{getStat(data) ? getStat(data).success ? getStat(data).success : 0 : 0}</IonLabel>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonIcon color={"danger"} ios={trendingDownOutline} md={trendingDownSharp}></IonIcon>
                                &nbsp;
                                <IonLabel>{getStat(data) ? getStat(data).wrong ? getStat(data).wrong : 0 : 0}</IonLabel>
                            </IonItem>
                        </IonCol>
                        <IonCol>
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
                        <IonCol>
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
                        <IonCol>
                            <IonButton expand="block" fill="clear" color="danger" onClick={() => {
                                setNewData({});
                                setEdit(false);
                                setItem("");
                            }}>
                                <IonIcon slot="icon-only" ios={closeOutline} md={closeSharp}></IonIcon>
                            </IonButton>
                        </IonCol>
                        <IonCol>
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
                            <IonItem>
                                <h2>{data?.first}</h2>
                            </IonItem>
                        </IonCol>
                        <IonCol >
                            <IonItem>
                                <h2>{data?.second}</h2>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem disabled={!getUser.data}>
                                <IonIcon color={"success"} ios={trendingUpOutline} md={trendingUpSharp}></IonIcon>
                                &nbsp;
                                <IonLabel>{getStat(data) ? getStat(data).success ? getStat(data).success : 0 : 0}</IonLabel>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem disabled={!getUser.data}>
                                <IonIcon color={"danger"} ios={trendingDownOutline} md={trendingDownSharp}></IonIcon>
                                &nbsp;
                                <IonLabel>{getStat(data) ? getStat(data).wrong ? getStat(data).wrong : 0 : 0}</IonLabel>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonButton expand="block" fill="clear" color="danger" disabled>
                                <IonIcon slot="icon-only" ios={closeOutline} md={closeSharp}></IonIcon>
                            </IonButton>
                        </IonCol>
                        <IonCol>
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
                        <IonRow class="flex-container">
                            <IonCard class="flex-item flex-item-25">
                                <IonCardHeader>
                                    <IonCardTitle>
                                        <h4>Set: {getSet.data?.name}</h4>
                                        <h4>User: {getSet.data?.userid}</h4>
                                    </IonCardTitle>
                                </IonCardHeader>
                            </IonCard>
                            <IonCard routerLink={"/Set/" + id + "/Learn"} routerDirection="none" class="flex-item flex-item-50">
                                <IonCardHeader>
                                    <IonCardTitle>
                                        Learn
                                    </IonCardTitle>
                                </IonCardHeader>
                            </IonCard>
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