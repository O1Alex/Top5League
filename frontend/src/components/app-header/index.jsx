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

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <HeaderCenter />
                    <HeaderRight />
                </div>

                </div>
            </nav>
        </header>
    );
});

export default AppHeader;