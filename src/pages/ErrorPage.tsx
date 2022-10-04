import { IonRouterLink } from '@ionic/react';
import { useLocation } from 'react-router';
import Page from '../components/Page';
import './ErrorPage.css';

const ErrorPage: React.FC = () => {

    const name = useLocation().pathname.split('/')[1];

    return (
        <Page title={name} component={()=>{
            return (
                <div className="container">
                    <strong>{name} not found</strong>
                    <p>Goto <IonRouterLink routerLink="/Home" routerDirection="none">Home</IonRouterLink></p>
                </div>
            );
        }}></Page>
    );
};

export default ErrorPage;
