import { memo } from 'react';

const Rules= memo(()=>  {
    return (
        // Section règle du jeu
        <section className="rules-section py-4 mb-5">

            <div className="div-title-rules d-flex justify-content-center mb-5">
                <h1 className="title-part mb-4">Comment ça marche ?</h1>
            </div>

            <div className="rules row g-5">

                <div className="col-12 col-md-4">
                    <div className="rules-step h-100 p-3">
                        <h5 className="rules-step-title mb-3"> 1- Découvre les joueurs</h5>
                        <p className="text-rules">Chaque début de mois, <span className="important">les 20 meilleurs joueurs</span> (4 par poste) du mois passé sont sélectionnés en fonction de leurs statistiques et mis à disposition afin que tu puisses créer ton équipe type.</p>
                    </div>
                </div>

                <div className="col-12 col-md-4">
                    <div className="rules-step h-100 p-3">
                        <h5 className="rules-step-title mb-3">2- Crée ton 5 majeurs</h5>
                        <p className="text-rules">Tu crées ton Top 5 <span className="important">au début du mois</span> en sélectionnant 1 joueur par poste et tu indiques <span className="important">les statistiques (points, rebonds, passes)</span> que, d'après toi, chaque joueur va réaliser en moyenne sur le mois.</p>
                    </div>
                </div>

                <div className="col-12 col-md-4">
                    <div className="rules-step h-100 p-3">
                        <h5 className="rules-step-title mb-3">3- Remporte le maillot de ton choix </h5>
                        <p className="text-rules">Si tu trouves le Top 5 <span className="important">tu gagnes le maillot de ton choix</span> ! Pour départager celui qui repartira avec le maillot de son choix en cas d'égalité, on regardera celui étant le plus proche des stastiques de l'équipe de référence.</p>
                    </div>
                </div>

            </div>
        </section>
    )
});

export default Rules;
