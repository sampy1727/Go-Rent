const Footer = () => (
    <footer id="contact">
        <div className="container">
            <div className="footer-grid">
                <div className="footer-col">
                    <div className="logo" style={{ color: 'white', marginBottom: '1.5rem' }}>
                        <i className="fas fa-car"></i>
                        <span>Go-Rental</span>
                    </div>
                    <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
                        Premium car rental services with a focus on quality, convenience, and customer satisfaction.
                    </p>
                    <div className="social-links">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div className="footer-col">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#cars">Our Fleet</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#testimonials">Testimonials</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h3>Services</h3>
                    <ul className="footer-links">
                        <li><a href="#">Car Rental</a></li>
                        <li><a href="#">Long Term Rental</a></li>
                        <li><a href="#">Corporate Rental</a></li>
                        <li><a href="#">Airport Transfer</a></li>
                        <li><a href="#">One Way Rental</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h3>Contact Us</h3>
                    <div className="footer-contact">
                        <p><i className="fas fa-map-marker-alt"></i> 123 Rental Street, City, Country</p>
                        <p><i className="fas fa-phone-alt"></i> +1 (234) 567-8900</p>
                        <p><i className="fas fa-envelope"></i> info@gorental.com</p>
                        <p><i className="fas fa-clock"></i> Mon-Sun: 24/7</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 Go-Rental. All Rights Reserved. | <a href="#" style={{ color: '#cbd5e1' }}>Privacy Policy</a> | <a href="#" style={{ color: '#cbd5e1' }}>Terms of Service</a></p>
            </div>
        </div>
    </footer>
);

export default Footer; 