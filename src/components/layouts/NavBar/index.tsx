import Image from "next/image";
import React from "react";
import NavBarItem from "./NavBarItem";
import { NavBarContents } from "../../../utils/constants";
import { useRouter } from "next/router";
// import disclaimerIcon from '@/public/icons/toast.warn.svg;

const COMPANY_INFO = {
    copyright: `© ${new Date().getFullYear()} Powered by RIDU. All rights reserved.`,
}

function NavBar() {
    const router = useRouter();
    return (
        <div className="w-[15vw] md:w-[20vw] h-full border-3 border-r bg-white px-3 py-10 md:p-10 fixed z-[20]">
            <div className="flex flex-col items-center mb-20 cursor-pointer" onClick={() => {
                // Commented out hardcoded URL
                // router.replace("http://192.81.213.226:30");
                router.replace(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_PORT}`);
            }}>
                <div className="flex flex-row items-center gap-x-4">
                    <Image
                        src={require("../../../../public/svg/logo.svg")}
                        alt="SIRP Logo"
                        width={50}
                        height={50}
                    />
                    <h1 className="text-sirp-primary font-semibold text-[22px] hidden md:block">
                        Oracle Chat
                    </h1>
                </div>
                {/* <p className="text-sirp-primary font-semibold text-[18px] hidden md:block">
                    Oracle Chat
                </p> */}
            </div>

            <div className="w-full mt-10">
                {NavBarContents.map((item, index) => (
                    <NavBarItem item={item} index={index} key={index} />
                ))}
            </div>
            <div className="absolute bottom-10 text-[10px] px-5 -left-3">
                <div className="bg-gray-50 p-3 rounded">
                    <h3 className="justify-center font-semibold flex items-center mb-2">
                        <Image src={require('../../../../public/icons/toast.warn.svg')} alt="disclaimer" height={12} width={12} />&nbsp; DISCLAIMER
                    </h3>
                    <p>The information presented is intended for general informational purposes only. It is imperative that users independently verify and assess the output before making any consequential decisions. <br />Kindly be advised that the application's output may not comprehensively address individual needs and circumstances.
                        <br />
                        <br />
                    </p>
                    <p className="bg-sirp-primary text-white px-2 py-1 rounded-md">
                        {COMPANY_INFO.copyright}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default NavBar;