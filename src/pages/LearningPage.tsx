import { useParams } from "react-router";
import { useEffect, useState } from 'react';
import { useGetSet } from "../hooks/useApi";
import { IonCol, IonGrid, IonItem, IonLabel, IonRow, IonInput, IonButton, IonContent } from '@ionic/react';

interface LearningPageProps {
    id: string;
}


const LearningPage = () => {
    const { id } = useParams<LearningPageProps>();

    const getSet = useGetSet();
    const [collection, setCollection] = useState<any>({});
    const [index, setIndex] = useState<number>(0);

    function shuffle(array: any) {
        const newArray = [...array]
        const length = newArray.length
      
        for (let start = 0; start < length; start++) {
          const randomPosition = Math.floor((newArray.length - start) * Math.random())
          const randomItem = newArray.splice(randomPosition, 1)
      
          newArray.push(...randomItem)
        }
      
        return newArray
      }

    useEffect(() => {
        getSet.request(id);
        setIndex(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        if (getSet.data != null) {
            setCollection(shuffle(getSet.data?.data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getSet.data])

    return (
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonLabel>
                            {collection[index]?.first}
                        </IonLabel>

                        <IonItem>
                            <IonInput placeholder="Your Text"></IonInput>
                            <IonButton expand="full" onClick={() => {
                                setIndex(index + 1);
                            }}>Check</IonButton>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    );
};

export default LearningPage;