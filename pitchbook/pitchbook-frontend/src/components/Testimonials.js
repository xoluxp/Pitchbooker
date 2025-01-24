import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonials.css";

function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-heading">Testimonials</h2>
        <div className="testimonials-carousel">
          <Slider {...settings}>
            <div className="testimonial">
              <p className="testimonial-quote">
                "PitchBook has made it so much easier for our team to find and
                book pitches. It's a game-changer!"
              </p>
              <div className="testimonial-author">
                {/* Add author details here (name, image, etc.) */}
                <p>
                  John Doe, Captain of FC Awesome
                </p>
              </div>
            </div>
            {/* Add more testimonials here */}
            <div className="testimonial">
              <p className="testimonial-quote">
                "I love how easy it is to use PitchBook! The interface is clean
                and intuitive, and I can always find a pitch that meets our
                needs."
              </p>
              <div className="testimonial-author">
                {/* Add author details here (name, image, etc.) */}
                <p>
                  Jane Smith, Player at Goal Getters United
                </p>
              </div>
            </div>
            <div className="testimonial">
              <p className="testimonial-quote">
                "PitchBook is a lifesaver! No more endless phone calls or emails
                to book a pitch. Highly recommend it to any football
                enthusiast."
              </p>
              <div className="testimonial-author">
                {/* Add author details here (name, image, etc.) */}
                <p>
                  David Lee, Coach at City Strikers
                </p>
              </div>
            </div>
            <div className="testimonial">
              <p className="testimonial-quote">
                "As a busy professional, I appreciate how quickly I can book a
                pitch with PitchBook. It's convenient and saves me a lot of
                time."
              </p>
              <div className="testimonial-author">
                {/* Add author details here (name, image, etc.) */}
                <p>
                  Sarah Jones, Player at Weekend Warriors
                </p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;