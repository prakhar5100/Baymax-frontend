import { love } from "../constants"
const MadeWithLove = () => {
return (
    <div className='h-max w-screen bg-gradient-to-r from-slate-900 to-slate-700'>
            <h1 className='text-white text-6xl max-md:text-4xl font-bold text-center pt-16 pb-8 max-md:pb-3'>Made with ❤️ </h1>
            <h2 className='text-slate-200 text-4xl max-md:text-2xl text-center font-bold'>by</h2>
            <div className="flex max-sm:flex-col justify-around py-10 gap-4 lg:px-72">
                    {
                            love.map((person, index) => {
                                    return (
                                            <div key={index} className='flex flex-col items-center justify-center'>
                                                    <img src={person.img} alt={person.name} className='w-32 h-32 rounded-full mb-2' />
                                                    <h3 className='text-white text-2xl max-md:text-xl font-bold'>{person.name}</h3>
                                                    <p className='text-slate-200 text-lg max-md:text-sm'>{person.role}</p>
                                                    <a href={person.github} className="text-slate-400 text-sm hover:underline" target="blank">{person.github}</a>
                                            </div>
                                    )
                            })
                    }
            </div>
    </div>
)
}

export default MadeWithLove