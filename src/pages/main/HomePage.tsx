import "../index.css";
import { IonContent, IonGrid, IonCol, IonRow, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';

const HomePage: React.FC = () => {
    return (
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>
                                    Welcome to the Learnify!
                                </IonCardTitle>
                                <IonCardSubtitle>
                                    This is a learning app for everyone!
                                </IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonItem>
                                    <IonCardTitle>
                                        What is Learnify?
                                    </IonCardTitle>
                                </IonItem>
                                <IonItem>
                                    <IonCardSubtitle>
                                        Learnify is a learning app for everyone. You can create your own sets and learn from other people's sets.
                                    </IonCardSubtitle>
                                </IonItem>
                                <IonItem>
                                    <IonCardTitle>
                                        How to use Learnify?
                                    </IonCardTitle>
                                </IonItem>
                                <IonItem>
                                    <IonCardSubtitle>
                                        You can create your own sets and learn from other people's sets.
                                    </IonCardSubtitle>
                                </IonItem>
                                <IonItem>
                                    <IonCardTitle>
                                        How to support Learnify?
                                    </IonCardTitle>
                                </IonItem>
                                <IonItem>
                                    <IonCardSubtitle>
                                        You can support Learnify by a little sponsorship on <a target="_blank" href="https://patreon.com/LDprg" rel="noopener noreferrer">Patreon</a>.
                                    </IonCardSubtitle>
                                </IonItem>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    );
};

export default HomePage;