import { CONTACT_IMG } from "../utils/constant";
const ContactUs = () =>{

    return (
        <>
        <div className="flex-none md:flex lg:flex mt-[30%] md:mt-[20%] lg:mt-[10%]">
            <div className="py-8 lg:py-56 px-4 lg:px-8 lg:m-4" >
                <p className="font-bold text-lg lg:text-xl hidden sm:block">Hi there 🙋‍♂️ <br></br>
                I am Bhagyashri Ugale, if you have any queries or suggestions please reach out via mail.
                Contact: goodfood@gmail.com </p>
                <p className="font-bold  text-lg lg:text-xl block sm:hidden">Hi there 🙋‍♂️ <br></br>
                I am Bhagyashri Ugale, <br></br>if you have any queries or suggestions please reach out via mail.<br></br>
                Contact: goodfood@gmail.com </p>
            </div>
            <div className="w-11/12 m-auto md:-my-10 pb-40 lg:p-0 lg:m-0 lg:w-6/12 p-8">
                <img  src={ CONTACT_IMG }></img>
            </div>
        </div>
    </>
    )
}

export default ContactUs;