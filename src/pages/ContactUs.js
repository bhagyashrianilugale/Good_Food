import gsap from 'gsap';
import contactus_img from "../assets/contactus_img.jpg";
import { useRef } from "react";
import { useEffect } from "react";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";
const scriptURL ="https://script.google.com/macros/s/AKfycbx3hnkFAORwGGNcke1MmvTVHV3VzfnS3ggW8b2M8h5aZi7aCckCXdqtU8WK9UOyD3f90g/exec"


const ContactUs = () =>{
    const imgBox = useRef();
    const contactForm = useRef();
    const msg = useRef();

const submitForm =(e)=>{
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(contactForm.current.form)})
      .then(response =>{
           msg.current.style.innerHTML = "Message sent successfully";
           setTimeout(async()=>{
             msg.current.style.innerHTML = "";
             await form.reset();
           },3000)
        })

      .catch(error => console.error('Error!', error.message))
}

    useEffect(()=>{
        gsap.to(imgBox.current, { x:2, delay:0.7, duration: 2 })
    },[]);

    return (
        <>
                 {/**Contact us page container */}
         <h1 className="text-4xl font-bold text-center mt-[30%] sm:mt-[20%] md:mt-[8%]">Contact-Us</h1> 
          <div className="w-full flex-none md:flex p-4 h-full">
               <div className="w-full md:w-6/12">
                 <img 
                     ref={ imgBox }
                     className="w-[60%] mx-auto h-[60%] transform -translate-x-12"
                     src={ contactus_img } 
                     alt="maharashtrian_thali_img"/>
                 <p className="px-2 sm:px-8 tet-lg md:text-lg">
                    Use our contact form for all information requests or contact us directly using the contact information below.<br/>
                    <span className="text-center">
                        < MdOutlineAttachEmail className="inline text-orange-500"/> goodfood2024@gmail.com<br/>
                        < FaSquarePhone className="inline text-orange-500"/> +91 8763571782
                    </span><br/>
                    Feel free to get in touch with us via email or phone
                 </p>
            </div>
            <div  className="w-full mt-[3%] md:w-6/12">
                   <h1 className="text-2xl font-serif text-left">HAVE ANY QUESTIONS?</h1>
                   <div className="mx-auto">
                            <form name="submit-to-google-sheet" ref={contactForm} onSubmit={()=>submitForm}>
                                         <input 
                                                className="my-4 w-4/6 px-4 py-2 text-gray-300 rounded-md focus:outline-none"
                                                type="text" 
                                                name="name" 
                                                placeholder="Your Name" 
                                                required/>
                                                <br/>

                                         <input 
                                                className="my-4 w-4/6 px-4 py-2 text-gray-300 rounded-md focus:outline-none"
                                                type="text" 
                                                name="email" 
                                                placeholder="Your Email" 
                                                required/>
                                                <br/>
                                         <textarea 
                                                   className="px-4 py-2 mt-4 rounded-md focus:outline-none"
                                                   name="message" 
                                                   placeholder="Your Message" 
                                                   cols="32" rows="4"></textarea>
                                                <br/>
                                         <button type="submit"className="px-6 py-2 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-700 focus:outline-none">Submit</button>
                                   </form>
                        <span id="msg" ref={msg}></span>
                </div>
           </div>
        </div>
    </>
    )
}

export default ContactUs;