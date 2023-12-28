import { useState, useEffect } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import Nagget from '../assets/img/ngt.png';
import Smoked from '../assets/img/smkd.png';
import SosBak from '../assets/img/ssb.png';
import SosMer from '../assets/img/ssm.png';

const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = [ "GOOD FOOD, GOOD TASTE"];
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
        tick();
        }, delta);
        return () => { clearInterval(ticker) };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
        setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setIndex(prevIndex => prevIndex - 1);
        setDelta(period);
        } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setIndex(1);
        setDelta(500);
        } else {
            setIndex(prevIndex => prevIndex + 1);
        }
    }
    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                    <Carousel>
                        <Carousel.Item interval={1000}>
                            <img
                                className="d-block w-100"
                                src={SosBak}
                                alt="First slide"
                            />
                            <p style={{display: 'none'}}>{index}</p>
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={1000}>
                            <img
                                className="d-block w-100"
                                src={Nagget}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={1000}>
                            <img
                                className="d-block w-100"
                                src={Smoked}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={1000}>
                            <img
                                className="d-block w-100"
                                src={SosMer}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <div>
                            <h1><span className="txt-rotate" dataPeriod="1000" data-rotate='[ "GOOD FOOD GOOD TASTE"]'><span className="wrap">{text}</span></span></h1>
                            <br/>
                            <p>Produk kami terbuat dari bahan-bahan yang aman dan Halal.</p>
                            <p>Mengandung bahan-bahan :</p>
                            <p>Daging sapi, Daging Ayam, Soya Protein, Gandum, Whey, Peanut dan lain-lain. Diproses dengan kualitas dan mutu terjamin</p>
                            
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        
    )
}

export default Banner