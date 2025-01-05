import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Testimonials.css';

function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Ensure only one slide is shown at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    // Add responsive settings to ensure one slide at a time on all screen sizes
    responsive: [
      {
        breakpoint: 1024, // For screens larger than 1024px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600, // For screens between 600px and 1024px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480, // For screens smaller than 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="testimonials-heading">What Our Users Say</h2>
        <div className="testimonials-carousel">
          <Slider {...settings}>
            <div className="testimonial">
              <p className="testimonial-quote">
                "PitchBook has made it so much easier for our team to find and book pitches. 
                It's a game-changer!"
              </p>
              <div className="testimonial-author">
                <p>John Doe, Captain of FC Awesome</p>
              </div>
            </div>
            <div className="testimonial">
              <p className="testimonial-quote">
                "I love how easy it is to use PitchBook! The interface is clean and intuitive, 
                and I can always find a pitch that meets our needs."
              </p>
              <div className="testimonial-author">
                <p>Jane Smith, Player at Goal Getters United</p>
              </div>
            </div>
            <div className="testimonial"> {/* New testimonial 1 */}
              <p className="testimonial-quote">
                "PitchBook is a lifesaver! No more endless phone calls or emails to book a pitch. 
                Highly recommend it to any football enthusiast."
              </p>
              <div className="testimonial-author">
                <p>David Lee, Coach at City Strikers</p>
              </div>
            </div>
            <div className="testimonial"> {/* New testimonial 2 */}
              <p className="testimonial-quote">
                "As a busy professional, I appreciate how quickly I can book a pitch with PitchBook. 
                It's convenient and saves me a lot of time."
              </p>
              <div className="testimonial-author">
                <p>Sarah Jones, Player at Weekend Warriors</p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;