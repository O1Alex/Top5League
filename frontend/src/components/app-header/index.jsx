import { memo } from 'react';
import HeaderLeft from './headerLeft';
import HeaderCenter from './headerCenter';
import HeaderRight from './headerRight';

const AppHeader = memo(() => {
    return (
         <header className="t5l-header">
            <nav className="navbar navbar-expand-lg pt-0 px-5">
                <div className="container-fluid pt-0">

                    <HeaderLeft />
                    <HeaderCenter />
                    <HeaderRight />
                </div>
            </nav>
        </header>
    );
});

export default AppHeader;