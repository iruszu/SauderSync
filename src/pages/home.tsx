import { ReactElement } from 'react';
import MyComponent from '@components/component';

export const Home = (): ReactElement => { 

    return (
    <>
            <MyComponent
                title="Sample Title"
                date="2025-07-07"
                description="This is a sample description."
            />
    </> )
}

export default Home;