import { ArrowLeft } from 'lucide-react'


const CreateAccountAd = () => {
    return (
        <div className="my-4 md:my-30 lg:my-50">
            <div className="relative w-full bg-blue-900 h-[50vh] p-10 rounded-2xl overflow-hidden md:overflow-visible bg-[url('/new-images/img-18.jpg')] bg-no-repeat bg-cover bg-center ">
                <a
                    className="flex items-center justify-center gap-3 text-center bg-teal-700 text-white md:absolute right-1 lg:right-50 bottom-20 w-[max-content] px-4 py-2 cursor-pointer rounded-md transition-transform duration-300 ease-in hover:scale-[1.02] hover:bg-teal-800 "
                    href="https://zempaa.com/signup"
                    target="_blank"
                >
                    Create account <ArrowLeft />
                </a>
                <div className="absolute w-[400] h-[30vh] p-5 rounded-2xl -mb-2 bg-blue-500 left-0 right-0 bottom-2 m-auto text-2xl md:text-4xl  md:font-medium text-white md:h-[60vh] md:ml-12 xl:ml-30 rounded-b-none bg-[url('/new-images/img-17.jpg')] bg-no-repeat bg-cover bg-center">
                    Elevate your shopping experience.
                </div>
            </div>
        </div>
    )
}

export default CreateAccountAd
