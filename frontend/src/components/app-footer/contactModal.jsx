const ContactModal = ({ show, close }) => {

    if (!show) return null;

    return (
        <>
            <div className="modal fade show d-block">
                <div className="modal-dialog">
                    <div className="modal-content">

                        {/* Header */}
                        <div className="modal-header d-flex justify-content-between">
                            <h4 className="modal-title">Contactez-nous</h4>
                            <button className="btn-close" onClick={close}></button>
                        </div>

                        <div className="modal-body">
                            {/* Adresse */}
                            <div className="mb-4">
                                <p><strong>Adresse :</strong></p>
                                <p> Top 5 League <br/> 23 rue de la montagnette <br/> 73000 Savoie</p>
                            </div>

                            {/* Telephone */}
                            <div className="mb-3">
                                <p><strong>Téléphone :</strong></p>
                                <a href="tel:+33612345678">+33 6 12 34 56 78
                                </a>
                            </div>

                            {/* Email */}
                            <div className="mb-3">
                                <p><strong>Email :</strong></p>
                                <a href="mailto:contact@top5league.fr">
                                    contact@top5league.fr
                                </a>
                            </div>

                            {/* Reseaux sociaux */}
                            <div className="mb-3">
                                <p className="mb-2"><strong>Réseaux sociaux :</strong></p>

                                <div className="d-flex justify-content-center gap-4 fs-3">
                                    <a href="#" className="text-dark"><i className="bi bi-instagram"></i></a>
                                    <a href="#" className="text-dark"><i className="bi bi-facebook"></i></a>
                                    <a href="#" className="text-dark"><i className="bi bi-linkedin"></i></a>
                                </div>

                            </div>

                        </div>

                        {/* Footer */}
                        <div className="modal-footer">
                            <button className="btn btn-secondary btn-close-modal" onClick={close}>
                            Fermer
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
};

export default ContactModal;
