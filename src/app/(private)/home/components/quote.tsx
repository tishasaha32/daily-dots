import Image from "next/image";
import { QuoteBackground } from "@/assets";

type QuoteProps = {
    quotes: Quote[];
}

const Quote = ({ quotes }: QuoteProps) => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return (
        <div className="flex flex-col items-center relative">
            <p className="absolute top-[7vh] md:top-1/2 px-24 text-center text-lg font-bold text-black"><i>{randomQuote.quote}</i></p>
            <Image src={QuoteBackground} alt="Quote Background" className="object-contain md:h-96" />
        </div>
    );
};

export default Quote;
