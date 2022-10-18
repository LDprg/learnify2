import { useLocation, useParams } from "react-router";
import { useEffect, useRef, useState } from 'react';
import { useGetSet, useUpdateUserStat } from "../hooks/useApi";
import { IonCol, IonGrid, IonItem, IonLabel, IonRow, IonInput, IonButton, IonContent, IonProgressBar } from '@ionic/react';

interface LearningPageProps {
    id: string;
}


const LearningPage = () => {
    const { id } = useParams<LearningPageProps>();

    const location = useLocation();

    const input = useRef(null);

    const getSet = useGetSet();
    const updateUserStat = useUpdateUserStat();

    const [collection, setCollection] = useState<any>({});
    const [index, setIndex] = useState<number>(0);
    const [mode, setMode] = useState<string>('ask');

    const [answer, setAnswer] = useState<string>('');
    const [wrongAnswer, setWrongAnswer] = useState<string>('');
    const [correct, setCorrect] = useState<number>(0);

    function isStared() {
        return (location.state as any)?.stared ?? false
    }

    function getStared() {
        return (location.state as any)?.data ?? []
    }

    function shuffle(array: any) {
        const newArray = [...array]

        if(isStared()) {            
            newArray.reduceRight((acc, value, index) => {
                var found = false;

                for(var stared of getStared()) {
                    if(value._id === stared.cardid) {   
                        found = true;
                    }
                }

                if(!found) {
                    newArray.splice(index, 1);
                }

                return [];
            }, []);
        }

        const length = newArray.length

        for (let start = 0; start < length; start++) {
            const randomPosition = Math.floor((newArray.length - start) * Math.random())
            const randomItem = newArray.splice(randomPosition, 1)

            newArray.push(...randomItem)
        }

        return newArray
    }

    useEffect(() => {
        if (location.pathname === "/Set/" + id + "/Learn") {
            setIndex(0);
            setMode("ask");
            (input.current as any)?.setFocus();
            getSet.request(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, id]);

    useEffect(() => {
        if (getSet.loading === false && getSet.data != null) {
            setCollection(shuffle(getSet.data?.data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getSet.loading])

    useEffect(() => {
        if (collection[index]?.second === "" || collection[index]?.first === "") {
            collection[index].correct = true;
            setIndex(index + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collection])

    useEffect(() => {
        if (getSet.loading === false && collection.length > 0) {
            if (collection.length <= index) {
                setMode("final");
            }
            else {
                if (collection[index]?.second === "" || collection[index]?.first === "") {
                    collection[index].correct = true;
                    setIndex(index + 1);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    const askSubmit = () => {
        (input.current as any)?.setFocus();
        if (answer.trim() === collection[index]?.second) {
            collection[index].correct = true;
            setIndex(index + 1);
            setCorrect(correct + 1);
            updateUserStat.request(id, collection[index]._id, "success");
            setAnswer('');
        } else {
            collection[index].correct = false;
            setAnswer('');
            setWrongAnswer(answer);
            updateUserStat.request(id, collection[index]._id, "wrong");
            setMode('result');
        }
    }

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
                            <IonInput placeholder="Your Text" value={answer} onIonChange={e => setAnswer(e.detail.value!)} ref={input} onKeyDown={e => e.key === 'Enter' && askSubmit()}></IonInput>
                            <IonButton expand="full" onClick={askSubmit}>Check</IonButton>
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
                            <IonLabel color={"success"}>
                                Correct Answer: {collection[index]?.second}
                            </IonLabel>
                            <IonLabel color={"danger"}>
                                Your Answer: {wrongAnswer}
                            </IonLabel>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Answer: </IonLabel>
                            <IonInput placeholder="Your Text" value={answer} onIonChange={e => {
                                setAnswer(e.detail.value!);
                                (input.current as any)?.setFocus();

                                if (e.detail.value!.trim() === collection[index]?.second) {
                                    setIndex(index + 1);
                                    setAnswer('');
                                    setMode('ask');
                                }
                            }} ref={input}></IonInput>
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
                        <IonItem class="ion-text-center">
                            <IonLabel>Final</IonLabel>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        {collection.map((item: any, index: number) => {
                            return (
                                <IonItem key={index}>
                                    <IonLabel color={item.correct ? "success" : "danger"}>
                                        {item.first} - {item.second}
                                    </IonLabel>
                                </IonItem>
                            );
                        })}
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton expand="full" fill="clear" routerLink={"/Set/" + id} routerDirection="none">Back to Set Page</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton expand="full" fill="clear" routerLink={"/Set/" + id + "/Learn"} routerDirection="none">Again</IonButton>
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
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonItem class="ion-text-center" lines="none">
                            <IonLabel>
                                {index} / {collection.length}
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonProgressBar value={correct / collection.length} style={{ height: "0.5em", margin: "5px" }} color="success"></IonProgressBar>
                            <IonProgressBar value={(index - correct) / collection.length} style={{ height: "0.5em", margin: "5px" }} color="danger"></IonProgressBar>
                            <IonProgressBar value={index / collection.length} style={{ height: "0.5em", margin: "5px" }}></IonProgressBar>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </IonGrid>
            {mapper()}
        </IonContent>
    );
};

export default LearningPage;