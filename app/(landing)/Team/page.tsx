import Image from "next/image"


const TeamPage = () => {
    return (
        <div className="flex items-center justify-center flex-col">
            <div className="text-3xl md:text-6xl to-pink-600 text-black px-4 p-2 rounded-md pb-4 w-fit">
                Meet the team!
            </div>
                <div className="flex flex-col md:flex-row items-center justify-center">
                    <div className="flex flex-col items-center justify-center p-10">
                        <Image src="/teampics/pic_stock.jpg" width={200} height={200} className="rounded-full shadow-md" alt="Ilse Westra"/>
                        <div className="text-center text-5xl p-2">
                            Ilse Westra
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-10">
                        <Image src="/teampics/pic_stock.jpg" width={200} height={200} className="rounded-full shadow-md" alt="Zhinan Gao"/>
                        <div className="text-center text-5xl p-2">
                            Zhinan Gao
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-10">
                        <Image src="/teampics/pic_stock.jpg" width={200} height={200} className="rounded-full shadow-md" alt="Erik Blondell" />
                        <div className="text-center text-5xl p-2">
                            Erik Blondell
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-10">
                        <Image src="/teampics/pic_stock.jpg" width={200} height={200} className="rounded-full shadow-md" alt="Remi Gardette"/>
                        <div className="text-center text-5xl p-2">
                            Remi Gardette
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-10">
                        <Image src="/teampics/pic_stock.jpg" width={200} height={200} className="rounded-full shadow-md" alt="Redve Ahmed"/>
                        <div className="text-center text-5xl p-2">
                            Redve Ahmed
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default TeamPage;
