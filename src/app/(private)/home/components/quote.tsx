import Image from "next/image";
import { quotes } from "@/data";
import { QuoteBackground } from "@/assets";
const Quote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return (
        <div className="flex flex-col items-center relative md:static">
            <p className="absolute md:static top-[7vh] px-24 text-center text-lg font-bold"><i>{randomQuote.quote}</i></p>
            <Image src={QuoteBackground} alt="Quote Background" className="md:hidden" />
        </div>
    );
};

export default Quote;
