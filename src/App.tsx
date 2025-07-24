import LoginForm from "./pages/Forms/LoginForm"
import Home from "./pages/Home/Home"
import PropertyDetail from './pages/Home/PropertyDetail'
import ResidentsPages from "./pages/Residents/Residents"
import Profile from "./pages/Profile/Profile"
import Footer from "./pages/Forms/publicator/FooterPublicator"
import BeneficiosArrendadores from "./pages/Forms/publicator/beneficPublicator"
import FormPublication from "./pages/Forms/publicator/formPublicator"
import RentSpaceBanner from "./pages/Forms/publicator/publicatorRoom"
import AdminRoomsView  from "./pages/administrator/roomAdministrator"
function App() {

  return (

    <>

     {/* <Profile/> 
      <Home/>  */}
         {/* <LoginForm/>   */}
         {/* <ResidentsPages/>  
         <PropertyDetail/>  
        <RentSpaceBanner />
        <FormPublication/>
        <BeneficiosArrendadores />
          <Footer /> */}
          
           <AdminRoomsView />   

    </>
     
  )
}

export default App
