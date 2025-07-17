'use client'

import ContactSection from '@/features/contact-section'
import MapIframe from '@/features/map'
import ReviewsSection from '@/features/reviews-section'




const ContactPage = () => {
  return (
    <>
      <section className='flex items-center justify-center my-20'>
        <MapIframe />
      </section>

      {/* contact section  */}
      <section className='m-10'>
        <ContactSection />
      </section>

      {/* <section className='my-15'>
        <ReviewsSection/>
      </section> */}

    </>
  )
}

export default ContactPage