import "./index.css";
import { IonContent, IonRow, IonCol, IonGrid, IonCard, IonCardHeader, IonCardTitle, IonLabel, IonIcon, IonButton, useIonAlert, IonItem, IonModal, IonHeader, IonToolbar, IonButtons, IonTitle, IonTextarea, IonSpinner, IonText, IonSelect, IonSelectOption } from '@ionic/react';
import { useLocation, useParams, useHistory } from 'react-router';
import { useGetSet, useGetUser, useGetUserStatShort, useUpdateSet, useUpdateUserStared } from '../hooks/useApi';
import { useEffect, useState } from "react";
import { addOutline, addSharp, checkmarkOutline, checkmarkSharp, closeOutline, closeSharp, helpOutline, helpSharp, pencilOutline, pencilSharp, starOutline, starSharp, trendingDownOutline, trendingDownSharp, trendingUpOutline, trendingUpSharp } from "ionicons/icons";
interface SetPageProps {
    id: string;
}

const SetsPage: React.FC = () => {
    const { id } = useParams<SetPageProps>();

    const location = useLocation();
    const history = useHistory();

    const [presentAlert] = useIonAlert();

    const getSet = useGetSet();
    const getUser = useGetUser();
    const updateSet = useUpdateSet();
    const getUserStatShort = useGetUserStatShort();
    const updateUserStared = useUpdateUserStared();

    const [collection, setCollection] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

    const [sortMode, setSortMode] = useState<string>("created");

    const [edit, setEdit] = useState(false);
    const [item, setItem] = useState("");
    const [newData, setNewData] = useState<any>({});

    const [isOpenExport, setIsOpenExport] = useState(false);
    const [exportVal, setExportVal] = useState("");
    const [isOpenImport, setIsOpenImport] = useState(false);
    const [importVal, setImportVal] = useState("");

    useEffect(() => {
        setCollection(getSet.data);
    }, [getSet.data])

    useEffect(() => {
        if (location.pathname === "/Set/" + id) {
            getUser.request().then((res: any) => {
                getSet.request(id);
                setLoading(false);          
                getUserStatShort.request(id).then((res: any) => {
                    sortSet();
                });
            });
        } else {            
            getSet.reset();

            getUser.reset();

            getUserStatShort.reset();

            setCollection({});
            setLoading(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, id]);

    useEffect(() => {
        if (isOpenExport === true) {
            var text = "";
            for (const item of getSet.data?.data) {
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

    const getStar = (data: any) => {
        return getUserStatShort.data?.data.find((value: any) => value.cardid === data?._id)?.stared;
    }

    const getStared = () => {
        return getUserStatShort.data?.data.filter((value: any) => value.stared);
    }

    const sortSet = () => {
        if (sortMode === "statasc" && collection?.data != null) {
            collection?.data.sort((a: any, b: any) => {
                return (getStat(b).wrong ?? 0) - (getStat(a).wrong ?? 0);
            }).then(() => {
                setCollection(collection);
            });
        } else if (sortMode === "statdesc" && collection?.data != null) {
            collection?.data.sort((a: any, b: any) => {
                return (getStat(b).success ?? 0) - (getStat(a).success ?? 0);
            }).then(() => {
                setCollection(collection);
            });
        } else {
            setCollection(getSet.data);
        }
    }

    const renderUser = (data: any) => {
        const noEditMode = !edit || item !== data._id;

        return (
            <IonGrid>
                <IonRow class="ion-align-items-center ion-padding-vertical">
                    <IonCol sizeXl={noEditMode ? "2" : "4"} sizeMd="6" sizeXs="6" class="ion-no-padding">
                        <IonItem lines={noEditMode ? "none" : "full"} class="text-big">
                            <IonTextarea class="ion-no-margin ion-no-padding" value={noEditMode ? data?.first : newData.first} placeholder="Value" onIonChange={(e) => {
                                setNewData({ ...newData, first: e.detail.value });
                            }} readonly={noEditMode} autoGrow></IonTextarea>
                        </IonItem>
                    </IonCol>

                    <IonCol sizeXl={noEditMode ? "2" : "4"} sizeMd="6" sizeXs="4" class="ion-no-padding">
                        <IonItem lines={noEditMode ? "none" : "full"} class="text-big">
                            <IonTextarea class="ion-no-margin ion-no-padding" value={noEditMode ? data?.second : newData.second} placeholder="Key" onIonChange={(e) => {
                                setNewData({ ...newData, second: e.detail.value });
                            }} readonly={noEditMode}></IonTextarea>
                        </IonItem>
                    </IonCol>
                    {noEditMode ?
                        <IonCol sizeXl="1" sizeMd="2" sizeXs="4" class="ion-no-padding">
                            <IonItem disabled={!getUser.data} class="ion-text-center">
                                <IonLabel class="ion-no-margin">
                                    <IonIcon color={"danger"} ios={trendingDownOutline} md={trendingDownSharp}></IonIcon>
                                    &nbsp;
                                    {getStat(data) ? getStat(data).wrong ? getStat(data).wrong : 0 : 0}
                                </IonLabel>
                            </IonItem>
                        </IonCol>
                        : null}
                    {noEditMode ?
                        <IonCol sizeXl="2" sizeMd="2" sizeXs="4" class="ion-no-padding">
                            <IonItem disabled={!getUser.data} class="ion-text-center">
                                <IonLabel class="ion-no-margin">
                                    <IonIcon color={"warning"} ios={helpOutline} md={helpSharp}></IonIcon>
                                    &nbsp;
                                    {getStat(data) ? getStat(data).skip ? getStat(data).skip : 0 : 0}
                                </IonLabel>
                            </IonItem>
                        </IonCol>
                        : null}
                    {noEditMode ?
                        <IonCol sizeXl="1" sizeMd="2" sizeXs="4" class="ion-no-padding">
                            <IonItem disabled={!getUser.data} class="ion-text-center">
                                <IonLabel class="ion-no-margin">
                                    <IonIcon color={"success"} ios={trendingUpOutline} md={trendingUpSharp}></IonIcon>
                                    &nbsp;
                                    {getStat(data) ? getStat(data).success ? getStat(data).success : 0 : 0}
                                </IonLabel>
                            </IonItem>
                        </IonCol>
                        : null}
                    {noEditMode ?
                        <IonCol sizeXl="2" sizeMd="2" sizeXs="4" class="ion-no-padding">
                            <IonButton expand="block" fill="clear" color={getStar(data) ? "warning" : "medium"} onClick={() => {
                                updateUserStared.request(id, data._id, getStar(data) === undefined ? true : !getStar(data)).then(() => {
                                    getUserStatShort.request(id);
                                });
                            }} disabled={!getUser.data}>
                                <IonIcon slot="icon-only" ios={starOutline} md={starSharp}></IonIcon>
                            </IonButton>
                        </IonCol>
                        : null}
                    <IonCol sizeXl={noEditMode ? "1" : "2"} sizeMd={noEditMode ? "2" : "6"} sizeXs={noEditMode ? "4" : "6"} class="ion-no-padding">
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
                    <IonCol sizeXl={noEditMode ? "1" : "2"} sizeMd={noEditMode ? "2" : "6"} sizeXs={noEditMode ? "4" : "6"} class="ion-no-padding">
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
        if (loading) {
            return (
                <IonSpinner name="circular" class="spinner-center"></IonSpinner>
            );
        }
        else if (getSet.data && !getSet.loading) {
            return (
                <IonGrid>
                    <IonRow class="flex-container">
                        <IonCard class="flex-item flex-item-25">
                            <IonCardHeader>
                                <IonCardTitle>
                                    <h4>Set: {collection?.name}</h4>
                                    <h4>User: {collection?.userid}</h4>
                                </IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard routerLink={"/Set/" + id + "/Learn"} routerDirection="none" class="flex-item flex-item-25" disabled={collection?.data?.length === 0}>
                            <IonCardHeader>
                                <IonCardTitle>
                                    Learn
                                </IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard class="flex-item flex-item-25" disabled={getStared() ? getStared().length === 0 : true || collection?.data?.length === 0} onClick={() => {
                            history.push("/Set/" + id + "/Learn", {
                                stared: true,
                                data: [...getStared()]
                            });
                        }}>
                            <IonCardHeader>
                                <IonCardTitle>
                                    <IonIcon color={"warning"} ios={starOutline} md={starSharp}></IonIcon>
                                    &nbsp;
                                    Learn
                                </IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    </IonRow>
                    <IonRow class="flex-container">
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
                        <IonCard onClick={() => setIsOpenExport(true)} class="flex-item flex-item-25">
                            <IonCardHeader>
                                <IonCardTitle>
                                    Export
                                </IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
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
                        <IonCard onClick={() => setIsOpenImport(true)} disabled={collection?.userid !== getUser.data?.id} class="flex-item flex-item-25">
                            <IonCardHeader>
                                <IonCardTitle>
                                    Import
                                </IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    </IonRow>
                    <IonRow class="ion-margin-horizontal">
                        <IonCol>
                            <IonToolbar>
                                <IonItem lines="none" slot="start" class="ion-no-margin">
                                    <IonText color={"medium"}>
                                        {getSet.data?.data?.length} Cards
                                    </IonText>
                                </IonItem>
                                <IonLabel slot="end">Sort:&nbsp;</IonLabel>
                                <IonSelect slot="end" interface="popover" value={sortMode} onIonChange={(event: any) => {
                                    setSortMode(event.detail.value);
                                    sortSet();
                                }} >
                                    <IonSelectOption value="created">Created</IonSelectOption>
                                    <IonSelectOption value="statasc">Statistic asc</IonSelectOption>
                                    <IonSelectOption value="statdesc">Statistic desc</IonSelectOption>
                                </IonSelect>
                            </IonToolbar>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            {collection?.data?.map((data: any, index: number) => {
                                return (
                                    <IonCard key={index}>
                                        {renderUser(data)}
                                    </IonCard>
                                );
                            })}
                            <IonButton expand="block" fill="clear" onClick={() => {
                                collection?.data?.push({ first: "", second: "" });

                                updateSet.request(id, collection).then(() => {
                                    getSet.request(id);
                                });
                            }} disabled={collection?.userid !== getUser.data?.id || !getUser.data}>
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