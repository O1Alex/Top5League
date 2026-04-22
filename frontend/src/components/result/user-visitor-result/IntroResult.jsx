import { memo, useContext } from 'react';
import { AuthContext } from '../../../context/AuthProviders';

const IntroResult = memo(({winner}) => {

    const { user } = useContext(AuthContext);
    const isUser = user?.role === "user";

    return (
        <section className='intro-result-user'>
            <div className="winner-case p-4 h-100 text-center">

                <h3 className="winner-title">Le grand gagnant du mois dernier</h3>

                <div className="trophy my-3">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32 3.125C30.5508 3.125 29.125 4.725 29.125 7C29.125 9.275 30.5508 10.875 32 10.875C33.4492 10.875 34.875 9.275 34.875 7C34.875 4.725 33.4492 3.125 32 3.125ZM19.0061 3.49688L16.9939 4.50313C18.8804 8.27625 23.4151 11.6044 27.2674 13.8084L29.0417 36.875H30.875V24H33.125V36.875H34.9582L36.7326 13.8084C40.5849 11.6044 45.1196 8.27625 47.0061 4.50313L44.9939 3.49688C42.5051 7.23438 39.3825 9.64038 36.0771 10.7181C35.1639 12.16 33.7188 13.125 32 13.125C30.2812 13.125 28.8363 12.16 27.9229 10.718C24.6175 9.6405 21.4949 7.23438 19.0061 3.49688ZM21.125 39.125V51.125H3.125V60.875H60.875V57.125H42.875V39.125H21.125Z" fill="#F4D35B"/>
                    </svg>
                </div>

                <p className="winner-text">
                    Il s'agit ce mois ci de <strong>{winner?.User.username}</strong> qui est le seul a avoir trouvé le 5 ou qui est celui qui a  été le plus près des statistiques de chaque joueur ! <br />
                    Voici donc ci-dessous {isUser && "ton Top 5,"} le Top 5 de référence ainsi que le Top 5 gagnant mis côte à côte afin de pouvoir mieux les comparer.
                </p>

            </div>
        </section>
    )
})

export default IntroResult;
