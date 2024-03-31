import Image from "next/image"


const TeamPage = () => {
    return (
        <div className="container mx-auto px-6 md:px-12 lg:px-8">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-gray-800">Meet the Team!</h1>

            </div>

            <div className="py-20 grid gap-30 md:gap-12 md:grid-cols-5">
                <div className="border-t-4 space-y-8 group">
                    <div className="w-32 w-32 -mt-16 mx-auto rounded-[2rem] rotate-45 overflow-hidden">
                        <Image src="/teampics/pic_stock.jpg" width="200" height="200" loading="lazy" alt="Team Member" className="w-full h-full object-cover -rotate-45 scale-125 mx-auto transition duration-300 group-hover:scale-[1.4]" />
                    </div>
                    <div className="text-center">
                        <h5 className="text-xl font font-semibold">
                            Redve Ahmed
                        </h5>
                        <span>
                            M.S.c. ICT Innovation Cloud and Network Infrastructure
                        </span>
                    </div>
                </div>
                <div className="border-t-4 space-y-8 group">
                    <div className="w-32 w-32 -mt-16 mx-auto rounded-[2rem] rotate-45 overflow-hidden">
                        <Image src="/teampics/pic_stock.jpg" width="200" height="200" loading="lazy" alt="Team Member" className="w-full h-full object-cover -rotate-45 scale-125 mx-auto transition duration-300 group-hover:scale-[1.4]" />
                    </div>
                    <div className="text-center">
                        <h5 className="text-xl font font-semibold">
                            Ilse Westra
                        </h5>
                        <span>
                            Exchange at KTH
                        </span>
                    </div>
                </div>
                <div className="border-t-4 space-y-8 group">
                    <div className="w-32 w-32 -mt-16 mx-auto rounded-[2rem] rotate-45 overflow-hidden">
                        <Image src="/teampics/pic_stock.jpg" width="200" height="200" loading="lazy" alt="Team Member" className="w-full h-full object-cover -rotate-45 scale-125 mx-auto transition duration-300 group-hover:scale-[1.4]" />
                    </div>
                    <div className="text-center">
                        <h5 className="text-xl font font-semibold">
                            Remi Gardette
                        </h5>
                        <span>
                            M.S.c. ICT Innovation Cloud and Network Infrastructure
                        </span>
                    </div>
                </div>
                <div className="border-t-4 space-y-8 group">
                    <div className="w-32 w-32 -mt-16 mx-auto rounded-[2rem] rotate-45 overflow-hidden">
                        <Image src="/teampics/pic_stock.jpg" width="200" height="200" loading="lazy" alt="Team Member" className="w-full h-full object-cover -rotate-45 scale-125 mx-auto transition duration-300 group-hover:scale-[1.4]" />
                    </div>
                    <div className="text-center">
                        <h5 className="text-xl font font-semibold">
                            Zhinan Gao
                        </h5>
                        <span>
                            Fill in later
                        </span>
                    </div>
                </div>
                <div className="border-t-4 space-y-8 group">
                    <div className="w-32 w-32 -mt-16 mx-auto rounded-[2rem] rotate-45 overflow-hidden">
                        <Image src="/teampics/pic_stock.jpg" width="200" height="200" loading="lazy" alt="Team Member" className="w-full h-full object-cover -rotate-45 scale-125 mx-auto transition duration-300 group-hover:scale-[1.4]" />
                    </div>
                    <div className="text-center">
                        <h5 className="text-xl font font-semibold">
                            Erik Blondell
                        </h5>
                        <span>
                            Fill in later
                        </span>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default TeamPage;
