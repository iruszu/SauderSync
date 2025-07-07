import { ReactElement, useEffect } from 'react';


export const Home = (): ReactElement => { 
    useEffect(() => {
        console.log("hello worldddd");
    }, []);
    
    return <>
        <header>
            Hello World!!
        </header></>
}

export default Home;