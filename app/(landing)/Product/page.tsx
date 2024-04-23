const ProducsPage = () => {
    return(
        <div>
            <h1 className="text-3xl pb-2 font-bold">Files for product such as report and Canvas</h1>
            <div className="pb-2">
                <a href="Business Model Canvas.jpg" className="hover:text-base border border-solid border-black" download> Business Model Canvas</a>
            </div>
            <div className="pb-2">
                <a href="Project Report.pdf" className="hover:text-base border border-solid border-black" download> Project report</a>
            </div>
            <div className="pb-2">
                <a href="Project Report.pdf" className="hover:text-base border border-solid border-black" download> Presentation</a>
            </div>
            <div className="pb-2">
                <a href="videoNoQrCode.mp4" className="hover:text-base border border-solid border-black" download> Project Video / Commerical</a>
            </div>
        </div>
    )
}

export default ProducsPage;

