import "../index.css";
import { IonRouterLink, IonTitle } from '@ionic/react';

const LogoutPage: React.FC = () => {
    return (
        <div className="container">
            <IonTitle>Logout Complete!</IonTitle>
            <p>Goto <IonRouterLink routerLink="/Login" routerDirection="none">Login</IonRouterLink></p>
        </div>
    );
};

export default LogoutPage;