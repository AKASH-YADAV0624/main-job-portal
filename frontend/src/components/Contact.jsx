import React from "react";
import Header from "./shared/Header";
import Footer from "./Footer";

const Contact=()=>{
    return(
        <div>
            <Header/>
            <div className="p-[40px_85px] max780:p-[25px_15px]">

            <h1 className="text-2xl">Contact</h1>

            <div className="flex my-10 border  text-center max780:flex-wrap">
                <div className="px-5 w-full py-5 flex flex-col items-center justify-center">
              <h1 className="text-sky-400 text-2xl my-2">Our Office</h1>
              <p className="text-xl">Riverside Building, Londo SE1 7PB, UK
              Phone (123) 123-456</p>
              <p className="text-green-500 text-xl">mail@example.com</p>
                </div>
                <div className="w-full h-96" >
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1717.4428269796258!2d-1.6242033!3d54.9755502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e7734dc20d87b%3A0x2e911404fa537b88!2sSt.%20James'%20Park!5e0!3m2!1sen!2s!4v1695735567996!5m2!1sen!2s
" className="w-full h-full " loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
            </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Contact;