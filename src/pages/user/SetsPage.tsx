import "../index.css";
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonRow, IonCol, IonGrid } from '@ionic/react';
import { useGetUserSet} from '../../hooks/useApi';
import useEffectOnce from '../../hooks/useEffectOnce';

const SetsPage: React.FC = () => {
    const getUserSet = useGetUserSet();

    useEffectOnce(() => {
        getUserSet.request();
    });

    const renderSets = () => {
        if (getUserSet.loading) {
            return <div>Loading...</div>;
        }
        else {
            return getUserSet.data?.map((data: any, index: number) => {
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
            });
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