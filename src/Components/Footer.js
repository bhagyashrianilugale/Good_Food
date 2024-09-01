import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full h-80 bg-red-300 footer_section">
      <p className="text-orange-400 text-lg text-center font-semibold py-10">वदनि कवळ घेता नाम घ्या श्रीहरीचे । 
         सहज हवन होते नाम घेता फुकाचे ।  <br/>
         जिवन करि जिवित्वा अन्न हे पूर्णब्रह्म ।  
         उदरभरण नोहे जाणिजे यज्ञकर्म ॥</p>
        <p className="text-center text-white cursor-pointer">
           &copy; 2024 <span className="text-orange-500">goodfood</span> ||
           Developed by <span className="text-orange-500">Bhagyashri Ugale</span>
        </p>
    </footer>
  );
};

export default Footer;
