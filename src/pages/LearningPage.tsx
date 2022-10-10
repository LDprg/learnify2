import { useLocation, useParams } from "react-router";
import { useEffect, useState } from 'react';
import { useGetSet } from "../hooks/useApi";
import { IonCol, IonGrid, IonItem, IonLabel, IonRow, IonInput, IonButton, IonContent } from '@ionic/react';

interface LearningPageProps {
    id: string;
}


const LearningPage = () => {
    const { id } = useParams<LearningPageProps>();

    const location = useLocation();

    const getSet = useGetSet();
    const [collection, setCollection] = useState<any>({});
    const [index, setIndex] = useState<number>(0);
    const [mode, setMode] = useState<string>('ask');

    const [answer, setAnswer] = useState<string>('');

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
    }, [location.pathname]);

    useEffect(() => {
        if (getSet.data != null) {
            setCollection(shuffle(getSet.data?.data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getSet.data])

    useEffect(() => {
        if (getSet.loading === false && collection.length > 0) {
            if (collection.length <= index) {
                setMode("final");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    const ask = () => {
        return (
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>
                                Question: {collection[index]?.first}
                            </IonLabel>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Answer: </IonLabel>
                            <IonInput placeholder="Your Text" value={answer} onIonChange={e => setAnswer(e.detail.value!)}></IonInput>
                            <IonButton expand="full" onClick={() => {
                                if (answer.trim() === collection[index]?.second) {
                                    collection[index].correct = true;
                                    setIndex(index + 1);
                                    setAnswer('');
                                } else {
                                    collection[index].correct = false;
                                    setMode('result');
                                }
                            }}>Check</IonButton>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </IonGrid>
        );
    }

    const result = () => {
        return (
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>
                                Correct Answer: {collection[index]?.second}
                            </IonLabel>
                            <IonLabel>
                                Your Answer: {answer}
                            </IonLabel>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Answer: </IonLabel>
                            <IonInput placeholder="Your Text" value={answer} onIonChange={e => setAnswer(e.detail.value!)}></IonInput>
                            <IonButton expand="full" onClick={() => {
                                if (answer.trim() === collection[index]?.second) {
                                    setIndex(index + 1);
                                    setAnswer('');
                                    setMode('ask');
                                }
                            }}>Check</IonButton>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </IonGrid>
        );
    }

    const final = () => {
        return (
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Final</IonLabel>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>{JSON.stringify(collection)}</IonLabel>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </IonGrid>
        );
    }

    const mapper = () => {
        if (mode === 'ask')
            return ask();
        else if (mode === 'result')
            return result();
        else if (mode === 'final')
            return final();
        return null;
    }

    return (
        <IonContent>
            {mapper()}
        </IonContent>
    );
};

export default LearningPage;