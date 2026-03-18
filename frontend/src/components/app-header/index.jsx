import { memo } from 'react';
import HeaderLeft from './headerLeft';
import HeaderCenter from './headerCenter';
import HeaderRight from './headerRight';

const AppHeader = memo(() => {
    return (
         <header class="t5l-header">
            <nav class="navbar navbar-expand-lg pt-0 px-5">
                <div class="container-fluid pt-0">

                    <HeaderLeft />
            <HeaderCenter />
            <HeaderRight />
                </div>
            </nav>
        </header>
    );
});

export default AppHeader;