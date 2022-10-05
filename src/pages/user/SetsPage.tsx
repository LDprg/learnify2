import "../index.css";
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonRow, IonCol, IonGrid } from '@ionic/react';
import { useGetUserSet } from '../../hooks/useApi';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SetsPage: React.FC = () => {
    const location = useLocation();

    const getUserSet = useGetUserSet();

    useEffect(() => {
        if (location.pathname === "/Sets")
            getUserSet.request();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const renderSets = () => {
        if (!getUserSet.loading) {
            if (JSON.stringify(getUserSet.data).length > 2) {
                return getUserSet.data?.map((data: any, index: number) => {
                    return (
                        <IonCard key={index} routerLink={"/Set/" + data._id} routerDirection="none">
                            <IonCardHeader>
                                <IonCardTitle>
                                    {data.name}
                                </IonCardTitle>
                                <IonCardSubtitle>
                                    User: {data.userid} <br />
                                    Id: {data._id}
                                </IonCardSubtitle>
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
                    <IonCol>
                        <h4>Your Sets:</h4>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        {renderSets()}
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    );
};

export default SetsPage;