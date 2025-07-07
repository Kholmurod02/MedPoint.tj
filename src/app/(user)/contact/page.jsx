import ContactSection from '@/features/contact-section'
import MapIframe from '@/widgets/map'



const ContactPage = () => {
  return (
    <div>
      <section className='flex items-center justify-center my-20'>
        <MapIframe />
      </section>

      {/* contact section  */}
      <section>
        <ContactSection />
      </section>

    </div>
  )
}

export default ContactPage