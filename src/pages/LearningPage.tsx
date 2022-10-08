import { useParams } from "react-router";
import { useEffect } from 'react';
import { useGetSet } from "../hooks/useApi";

interface LearningPageProps {
    id: string;
}


const LearningPage = () => {
    const { id } = useParams<LearningPageProps>();

    const getSet = useGetSet();

    useEffect(() => {
        getSet.request(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <div>
            <h1>Learning Page</h1>
            <h4>{id}</h4>
        </div>
    );
};

export default LearningPage;