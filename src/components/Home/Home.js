import Pulse from 'react-reveal/Pulse';
import c1 from '../../images/carosel/c1.jpg';
import c2 from '../../images/carosel/c2.png';
import c3 from '../../images/carosel/c3.webp';
import c4 from '../../images/carosel/c4.png';
import c5 from '../../images/carosel/c5.webp';
import Books from '../Books/Books';

const Home = () => {
    return (
        <div className="section">
            <div id="carouselExampleIndicators" className="carousel slide mt-2" data-bs-ride="true">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <Pulse>
                            <img src={c2} className="img-fluid d-block w-100" alt="..." />
                        </Pulse>
                    </div>
                    <div className="carousel-item">
                        <Pulse>
                            <img src={c3} className="img-fluid d-block w-100" alt="..." />
                        </Pulse>
                    </div>
                    <div className="carousel-item">
                        <Pulse>
                            <img src={c1} className="img-fluid d-block w-100" alt="..." />
                        </Pulse>
                    </div>
                    <div className="carousel-item">
                        <Pulse>
                            <img src={c4} className="img-fluid d-block w-100" alt="..." />
                        </Pulse>
                    </div>
                    <div className="carousel-item">
                        <Pulse>
                            <img src={c5} className="img-fluid d-block w-100" alt="..." />
                        </Pulse>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <Books />
        </div>
    )
}

export default Home;