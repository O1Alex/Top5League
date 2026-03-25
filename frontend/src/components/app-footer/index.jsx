import { memo, useState } from 'react';
import { Link } from "react-router-dom";
import ContactModal from "./contactModal"

const AppFooter = memo(() => {

    const [showModal, setShowModal]= useState(false);

    return (
        <div className='footer mt-4'>
            <footer className="p-3 pb-5">
                <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 px-5">
                    
                    <Link to="/" className="link-footer text-decoration-none ">
                        Mentions légales
                    </Link>

                    <span className=" link-footer">
                        Top5League © 2026
                    </span>

                    <button className=" btn btn-link link-footer" onClick={() => setShowModal(true)} >
                        Contact
                    </button>

                </div>
            </footer>

            <ContactModal 
                show={showModal} 
                close={() => setShowModal(false)}
            />
        </div>
    );
});

export default AppFooter;