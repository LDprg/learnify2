import "./index.css";
import { IonContent, IonRow, IonCol, IonGrid, IonCard, IonCardHeader, IonCardTitle, IonLabel, IonIcon, IonButton, IonInput, useIonAlert, IonItem, IonModal, IonHeader, IonToolbar, IonButtons, IonTitle, IonTextarea } from '@ionic/react';
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

    const [isOpenExport, setIsOpenExport] = useState(false);
    const [exportVal, setExportVal] = useState("");
    const [isOpenImport, setIsOpenImport] = useState(false);
    const [importVal, setImportVal] = useState("");

    useEffect(() => {
        if (location.pathname === "/Set/" + id) {
            getUser.request();
            getSet.request(id);
            getUserStatShort.request(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, id]);

    useEffect(() => {
        if (isOpenExport === true) {
            var text = "";
            console.log(getSet.data?.data);
            for (const item of getSet.data?.data) {
                console.log(item);
                text += item.first + "\t" + item.second + "\n";
            }
            setExportVal(text);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpenExport]);

    const importSet = async () => {
        await getSet.request(id);
        const data = getSet.data;
        const lines = importVal.split("\n");
        for (const line of lines) {
            const items = line.split("\t");
            if (items.length === 2) {
                data.data.push({ first: items[0], second: items[1] });
            }
        }
        updateSet.request(id, data).then(() => {
            getSet.request(id);
        });
    };

    const getStat = (data: any) => {
        return getUserStatShort.data?.data.find((value: any) => value.cardid === data?._id)?.stat;
    }

    const renderUser = (data: any) => {
        const noEditMode = !edit || item !== data._id;

        return (
            <IonGrid>
                <IonRow class="ion-align-items-center">
                    <IonCol sizeXl={noEditMode ? "2" : "3"} sizeXs="6">
                        <IonItem lines={noEditMode ? "none" : "full"} class="text-big">
                            <IonTextarea value={noEditMode ? data?.first : newData.first} placeholder="Value" onIonChange={(e) => {
                                setNewData({ ...newData, first: e.detail.value });
                            }} readonly={noEditMode} autoGrow></IonTextarea>
                        </IonItem>
                    </IonCol>

                    <IonCol sizeXl={noEditMode ? "2" : "3"} sizeXs="6">
                        <IonItem lines={noEditMode ? "none" : "full"} class="text-big">
                            <IonTextarea value={noEditMode ? data?.second : newData.second} placeholder="Key" onIonChange={(e) => {
                                setNewData({ ...newData, second: e.detail.value });
                            }} readonly={noEditMode} autoGrow></IonTextarea>
                        </IonItem>
                    </IonCol>
                    {noEditMode ?
                        <IonCol sizeXl="2" sizeMd="3" sizeXs="6">
                            <IonItem disabled={!getUser.data}>
                                <IonIcon color={"danger"} ios={trendingDownOutline} md={trendingDownSharp}></IonIcon>
                                &nbsp;
                                <IonLabel>{getStat(data) ? getStat(data).wrong ? getStat(data).wrong : 0 : 0}</IonLabel>
                            </IonItem>
                        </IonCol>
                        : null}
                    {noEditMode ?
                        <IonCol sizeXl="2" sizeMd="3" sizeXs="6">
                            <IonItem disabled={!getUser.data}>
                                <IonIcon color={"success"} ios={trendingUpOutline} md={trendingUpSharp}></IonIcon>
                                &nbsp;
                                <IonLabel>{getStat(data) ? getStat(data).success ? getStat(data).success : 0 : 0}</IonLabel>
                            </IonItem>
                        </IonCol>
                        : null}
                    <IonCol sizeXl={noEditMode ? "2" : "3"} sizeMd={noEditMode ? "3" : "6"} sizeXs="6">
                        <IonButton expand="block" fill="clear" color="danger" onClick={() => {
                            if (noEditMode) {
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
                            } else {
                                setNewData({});
                                setEdit(false);
                                setItem("");
                            }
                        }} disabled={getSet.data?.userid !== getUser.data?.id || !getUser.data}>
                            <IonIcon slot="icon-only" ios={closeOutline} md={closeSharp}></IonIcon>
                        </IonButton>
                    </IonCol>
                    <IonCol sizeXl={noEditMode ? "2" : "3"} sizeMd={noEditMode ? "3" : "6"} sizeXs="6">
                        <IonButton expand="block" fill="clear" onClick={() => {
                            if (noEditMode) {
                                setNewData(data);
                                setItem(data?._id);
                                setEdit(true);
                            } else {
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
                            }
                        }} disabled={getSet.data?.userid !== getUser.data?.id || !getUser.data}>
                            <IonIcon slot="icon-only" ios={noEditMode ? pencilOutline : checkmarkOutline} md={noEditMode ? pencilSharp : checkmarkSharp}></IonIcon>
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid >
        );
    }

    const renderSet = () => {
        if (!getSet.data && getSet.loading) {
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
                    </IonRow>
                </IonGrid>
            );
        }
        else if (getSet.data) {
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
                        <IonCard routerLink={"/Set/" + id + "/Learn"} routerDirection="none" class="flex-item flex-item-50" disabled={JSON.stringify(getSet.data?.data).length <= 2}>
                            <IonCardHeader>
                                <IonCardTitle>
                                    Learn
                                </IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonModal isOpen={isOpenExport}>
                                <IonHeader>
                                    <IonToolbar>
                                        <IonTitle>Export</IonTitle>
                                        <IonButtons slot="end">
                                            <IonButton onClick={() => setIsOpenExport(false)}>Close</IonButton>
                                        </IonButtons>
                                    </IonToolbar>
                                </IonHeader>
                                <IonContent className="ion-padding">
                                    <IonItem>
                                        <IonTextarea value={exportVal} auto-grow readonly></IonTextarea>
                                    </IonItem>
                                </IonContent>
                            </IonModal>
                            <IonCard onClick={() => setIsOpenExport(true)}>
                                <IonCardHeader>
                                    <IonCardTitle>
                                        Export
                                    </IonCardTitle>
                                </IonCardHeader>
                            </IonCard>
                        </IonCol>
                        <IonCol>
                            <IonModal isOpen={isOpenImport}>
                                <IonHeader>
                                    <IonToolbar>
                                        <IonTitle>Import</IonTitle>
                                        <IonButtons slot="end">
                                            <IonButton onClick={() => {
                                                importSet();
                                                setIsOpenImport(false);
                                            }}>Add</IonButton>
                                        </IonButtons>
                                        <IonButtons slot="end">
                                            <IonButton onClick={() => setIsOpenImport(false)}>Close</IonButton>
                                        </IonButtons>
                                    </IonToolbar>
                                </IonHeader>
                                <IonContent className="ion-padding">
                                    <IonItem>
                                        <IonTextarea value={importVal} auto-grow onIonChange={(e) => setImportVal(e.detail.value!)} onKeyDown={(e) => {
                                            if (e.key === 'Tab') {
                                                setImportVal(importVal + "\t");
                                                e.preventDefault();
                                            }
                                        }}></IonTextarea>
                                    </IonItem>
                                </IonContent>
                            </IonModal>
                            <IonCard onClick={() => setIsOpenImport(true)} disabled={getSet.data?.userid !== getUser.data?.id}>
                                <IonCardHeader>
                                    <IonCardTitle>
                                        Import
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