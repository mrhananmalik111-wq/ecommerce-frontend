import { Container, Row, Col, Card, Carousel, Button } from "react-bootstrap";
import "../css/Hero.css";

function Hero() {
    return (
        <Container className="mt-4">
            <Row className="g-3">

                {/* Left Slider */}
                <Col lg={8}>
                    <Carousel fade>

                        <Carousel.Item>
                            <Card className="hero-slider border-0 text-white">
                                <Card.Img
                                    src="https://img.freepik.com/premium-vector/best-season-sale-banner-design-template_2239-1175.jpg?w=2000"
                                    alt="Electronics"
                                />

                                <Card.ImgOverlay className="overlay d-flex flex-column justify-content-end">
                                    <h1>Summer Sale</h1>
                                    <p>Up to 50% OFF on Electronics</p>

                                    <Button variant="warning" className="w-auto">
                                        Shop Now
                                    </Button>
                                </Card.ImgOverlay>
                            </Card>
                        </Carousel.Item>

                        <Carousel.Item>
                            <Card className="hero-slider border-0 text-white">
                                <Card.Img
                                    src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200"
                                    alt="Fashion"
                                />

                                <Card.ImgOverlay className="overlay d-flex flex-column justify-content-end">
                                    <h1>New Fashion</h1>
                                    <p>Latest Collection Available</p>

                                    <Button variant="warning">
                                        Explore
                                    </Button>
                                </Card.ImgOverlay>
                            </Card>
                        </Carousel.Item>

                    </Carousel>
                </Col>

                {/* Right Card */}
                <Col lg={4}>
                    <Card className="offer-card border-0 text-white">

                        <Card.Img
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
                        />

                        <Card.ImgOverlay className="overlay d-flex flex-column justify-content-end">

                            <h3>30% OFF</h3>

                            <p>Running Shoes</p>

                            <Button variant="warning">
                                Buy Now
                            </Button>

                        </Card.ImgOverlay>

                    </Card>
                </Col>

            </Row>
        </Container>
    );
}

export default Hero;