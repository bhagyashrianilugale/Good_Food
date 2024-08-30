import { CONTACT_IMG } from "../utils/constant";
const ContactUs = () =>{

    return (
        <>
        <div className="flex-none sm:flex mt-[30%] sm:mt-[20%] md:mt-[10%]">
            <div className="py-8 sm:py-56 px-4 sm:px-8 sm:m-4" >
                <p className="font-bold text-lg sm:text-xl">Hi there 🙋‍♂️ <br></br>
                I am Bhagyashri Ugale, if you have any queries or suggestions please reach out via mail.
                Contact: goodfood@gmail.com </p>
            </div>
            <div className="w-11/12 m-auto sm:-my-10 md:-my-10 pb-40 md:w-6/12 p-8">
                <img  src={ CONTACT_IMG }></img>
            </div>
        </div>
    </>
    )
}

export default ContactUs;