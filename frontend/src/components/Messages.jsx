import React from "react";
import Header from "./shared/Header";
import Sidebar from "./Sidebar";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Messages=()=>{
    return(
        <div>
            <HelmetProvider>
            <Helmet>
        <title>Messages - findmycareer.co.in</title>
        <meta
          name="description"
          content="View your messages on FindMyCareer. Check your inbox for any updates job like asex call boy , sex call boy , playboy job ."
        />
        <meta property="og:title" content="Messages - findmycareer.co.in" />
        <meta
          property="og:description"
          content="View your messages on FindMyCareer. Check your inbox for any updates job like asex call boy , sex call boy , playboy job ."
        />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://findmycareer.co.in/messages" />
        <meta name="twitter:title" content="Messages - findmycareer.co.in" />
        <meta
          name="twitter:description"
          content="View your messages on FindMyCareer. Check your inbox for any updates job like asex call boy , sex call boy , playboy job ."
        />
        <meta name="twitter:image" content="/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://findmycareer.co.in/messages" />
      </Helmet>
            </HelmetProvider>
            <Header/>
            <div className="flex">
            <div className="h-full w-1/5 max1024:w-0">
                 <Sidebar/>    
                </div>
                <div className="p-[45px_40px]  w-full bg-[#d8d8d8] h-screen max780:p-[20px_20px] ">
                    <h1 className="text-2xl text-black">Messages</h1>
                    <h3 className="text-gray-400 my-2">Home &gt; Dashboard</h3>

                    <div className="bg-[#fff] my-9">
                        <h1 className="pl-8 py-3">Inbox</h1>
                        <hr />
                        <p className="pl-8 py-3">You don't have any message yet</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Messages;