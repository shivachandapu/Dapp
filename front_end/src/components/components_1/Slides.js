import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import car_1 from '../pic_1.jpg'
import car_2 from '../pic_2.jpg'
import car_3 from '../pic_3.jpg'
import Mod from '../Model'

let slides = () => {
    return(
        <>
        
        <Carousel>
            <Carousel.Item>
                
                <img
                    className="d-block w-100"
                    src={car_1}
                    alt="First slide"
                />
                
                <Carousel.Caption>
                    <h1><Mod/>
                        </h1>
                    {/* <h3>Hi</h3> */}
                    {/* <p>I don't know why I'm doing this but I like it.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={car_2}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={car_3}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
        </>  
    )
};

export default slides;