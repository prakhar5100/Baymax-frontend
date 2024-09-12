import Card from '../components/Card'
import { cardInfo } from '../constants'

const About = () => {
  return (
    <div className='w-screen h-max bg-slate-200 flex flex-col space-y-5 lg:px-16'>

            <h1 className='text-[#263145] text-6xl max-sm:text-4xl font-bold text-center mt-16 max-sm:mt-8'>What is Baymax?</h1>

        <div className='flex flex-col lg:flex-row md:flex-row lg:justify-around justify-center items-center gap-4 p-4 py-16 max-sm:py-8 '>
            {
                cardInfo.map((card, index) => {
                    return <Card key={index} img={card.img} title={card.title} text={card.text} />
                })
            }
        </div>

    </div>
  )
}

export default About