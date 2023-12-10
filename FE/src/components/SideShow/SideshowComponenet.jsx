import React, {Component} from "react";
import './Sideshow.css';
import '../../pages/css/reposive/sideshow.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
class SideshowComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            images: [
                '../../anhsideshow1.jpg',
                '../../anhsideshow3.jpg',
                '../../anhsideshow4.jpg',
                '../../anhsideshow5.jpg',
                '../../anhsideshow2.jpg'],
            currentIndex: 0,
        };
    }

    componentDidMount(){
        this.interval = setInterval(this.nexImage, 10000);
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
    nexImage = () => {
        const {currentIndex, images} = this.state;
        const newIndex = (currentIndex + 1) % images.length;
        this.setState ({currentIndex: newIndex});
    }
    preImage = () => {
        const {currentIndex, images} = this.state;
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        this.setState ({currentIndex: newIndex});
    }

    render() {
        const {images, currentIndex} = this.state;
        return (
            <div className="slideshow-container">
                <div className="prev-button" onClick={this.preImage}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>

                {images.map((image, index) => (
                    <div key={index} className={`slide ${index===currentIndex ? 'active' : ''}`}
                        style={{backgroundImage: `url(${process.env.PUBLIC_URL + image})`}}
                    ></div>
                ))}

                <div className="next-button" onClick={this.nexImage}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            </div>
        );
    }
}

export default SideshowComponent;