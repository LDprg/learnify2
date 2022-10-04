import { useEffect, useState } from "react";
import Sets from "../../services/Sets";
import "../index.css";
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonRow, IonCol, IonGrid } from '@ionic/react';
import useApi from "../../hooks/useApi";

const SetsPage: React.FC = () => {
    // const [userSet, setUserSet] = useState([{}]);
    const getUserSet = useApi(Sets.getUserSet());

    // useEffect(() => {
    //     Sets.getUserSet().then((val) => setUserSet(val));
    // }, []);

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
                        {getUserSet.data?.map((data: any, index: number) => {
                            return (
                                <IonCard key={index} className="ion-activated">
                                    <IonCardHeader>
                                        <IonCardTitle>{data.name}</IonCardTitle>
                                        <IonCardSubtitle>
                                            User: {data.userid} <br />
                                            Id: {data._id}
                                        </IonCardSubtitle>
                                    </IonCardHeader>
                                </IonCard>
                            );
                        })}
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    );
};

export default SetsPage;