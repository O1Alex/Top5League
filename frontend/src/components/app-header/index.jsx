import { memo } from 'react';
import HeaderLeft from './headerLeft';
import HeaderCenter from './headerCenter';
import HeaderRight from './headerRight';

const AppHeader = memo(() => {
    return (
        <div>
            <HeaderLeft />
            <HeaderCenter />
            <HeaderRight />
        </div>
    );
});

export default AppHeader;