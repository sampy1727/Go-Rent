const Testimonials = () => (
    <section className="testimonials" id="testimonials">
        <div className="container">
            <div className="section-title">
                <h2>What Our Customers Say</h2>
                <p>Hear from people who have experienced our service</p>
            </div>
            <div className="testimonials-grid">
                <div className="testimonial-card">
                    <div className="testimonial-header">
                        <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Sarah Johnson" className="testimonial-img" />
                        <div className="testimonial-author">
                            <h4>Sarah Johnson</h4>
                            <p>Business Traveler</p>
                        </div>
                    </div>
                    <div className="testimonial-rating">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </div>
                    <p>"The booking process was incredibly smooth and the car was in perfect condition when I picked it up. Will definitely use Go-Rental again for my business trips!"</p>
                </div>
                <div className="testimonial-card">
                    <div className="testimonial-header">
                        <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Michael Chen" className="testimonial-img" />
                        <div className="testimonial-author">
                            <h4>Michael Chen</h4>
                            <p>Family Vacation</p>
                        </div>
                    </div>
                    <div className="testimonial-rating">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </div>
                    <p>"We rented an SUV for our family vacation and it was perfect. Spacious, comfortable, and great fuel efficiency. The unlimited mileage option saved us a lot of money."</p>
                </div>
                <div className="testimonial-card">
                    <div className="testimonial-header">
                        <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Emily Rodriguez" className="testimonial-img" />
                        <div className="testimonial-author">
                            <h4>Emily Rodriguez</h4>
                            <p>Weekend Getaway</p>
                        </div>
                    </div>
                    <div className="testimonial-rating">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                    </div>
                    <p>"Great experience from start to finish. The car was clean, well-maintained, and exactly as described. The pickup and drop-off process was quick and easy."</p>
                </div>
            </div>
        </div>
    </section>
);

export default Testimonials; 