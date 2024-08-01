import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 -top-0 w-full">
      <div className="block sm:hidden text-white text-center -top-0">goodfood@gmail.com</div>
      <div className="container mx-auto px-4 hidden sm:block">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Good-Food</h3>
            <p className="text-gray-400">&copy; 2024 Bundl Technologies Pvt. Ltd</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Company</h3>
            <ul>
              <li><a href="#about" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="#careers" className="text-gray-400 hover:text-white">Careers</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-white">Team</a></li>
              <li><a href="#swiggy-one" className="text-gray-400 hover:text-white">Good-Food One</a></li>
              <li><a href="#swiggy-instamart" className="text-gray-400 hover:text-white">Good-Food Instamart</a></li>
              <li><a href="#swiggy-genie" className="text-gray-400 hover:text-white">Good-Food Genie</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Contact us</h3>
            <ul>
              <li><a href="#contact-us" className="text-gray-400 hover:text-white">Contact us</a></li>
              <li><a href="#help-support" className="text-gray-400 hover:text-white">Help & Support</a></li>
              <li><a href="#partner-with-us" className="text-gray-400 hover:text-white">Partner with us</a></li>
              <li><a href="#ride-with-us" className="text-gray-400 hover:text-white">Ride with us</a></li>
            </ul>
            <h3 className="text-xl font-bold mt-4 mb-2">Legal</h3>
            <ul>
              <li><a href="#terms" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
              <li><a href="#cookie-policy" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              <li><a href="#privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#investor-relations" className="text-gray-400 hover:text-white">Investor Relations</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">We deliver to:</h3>
            <ul>
              <li><a href="#bangalore" className="text-gray-400 hover:text-white">Bangalore</a></li>
              <li><a href="#gurgaon" className="text-gray-400 hover:text-white">Gurgaon</a></li>
              <li><a href="#hyderabad" className="text-gray-400 hover:text-white">Hyderabad</a></li>
              <li><a href="#delhi" className="text-gray-400 hover:text-white">Delhi</a></li>
              <li><a href="#mumbai" className="text-gray-400 hover:text-white">Mumbai</a></li>
              <li><a href="#pune" className="text-gray-400 hover:text-white">Pune</a></li>
            </ul>
          </div>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
