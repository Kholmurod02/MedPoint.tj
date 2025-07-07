import Swiperr from '@/features/swiper'
import React from 'react'

const DoctorsPage = () => {

  const healthTips = [
  {
    id: 1,
    description: "Avoid smoking and limit alcohol — they increase cancer and heart disease risk.",
    title: "CDC"
  },
  {
    id: 2,
    description: "Manage stress — chronic stress affects the heart, digestion, and immunity.",
    title: "Harvard Medical School"
  },
  {
    id: 3,
    description: "See a doctor regularly — early diagnosis saves lives.",
    title: "Ministry of Health"
  },
  {
    id: 4,
    description: "Take medications only as prescribed — self-medication can be dangerous.",
    title: "World Health Organization"
  }
];

  return (
    <div>


      <section className='h-[330px] w-full p-2 my-10'>
        <Swiperr data={healthTips} />
      </section>


    </div>
  )
}

export default DoctorsPage