

const Newletter: React.FC = () => {
    return (
        <div className="flex justify-center mt-10 md:mt-20">
        <div>
            <div>
                <h1 className="text-center text-4xl font-bold">Newsletter Subscription</h1>
                <p className="font-semibold text-xs text-center mt-2  md:text-xl text-gray-500 mx-10">Subscribe to our newsletter to get new freelance work and projects </p>
            </div>
            <div>
                <div className="mt-10 flex justify-center">
                    <input type='email' placeholder="Enter Your Email Address" className="rounded-xl py-2 px-4 w-64 md:w-96 shadow-lg shadow-blue-400"/>
                </div>
                <div className="flex justify-center">
                    <button className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Subscribe</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Newletter;
