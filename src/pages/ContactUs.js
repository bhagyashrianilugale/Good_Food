import { CONTACT_IMG } from "../utils/constant";
const ContactUs = () =>{

    return (
        <>
        <div className="flex mt-[10%]">
            <div className=" py-56 px-8 m-4" >
                <p className="font-bold text-xl">Hi there 🙋‍♂️ <br></br>
                I am Bhagyashri Ugale, if you have any queries or suggestions please reach out via mail.
                Contact: bhagyashriugalegoodfood@gmail.com </p>
            </div>
            <div className="w-6/12 p-8">
                <img  src={ CONTACT_IMG }></img>
            </div>
        </div>
    </>
    )
}

export default ContactUs;