import Footer from '@/widgets/footer'
import Header from '@/widgets/header'

const UserLayout = ({children}) => {
  return (
    <div>
        <Header/>
        {children}
        <Footer/>
    </div>
  )
}

export default UserLayout