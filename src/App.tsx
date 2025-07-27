import LoginForm from "./pages/Forms/LoginForm"
import Home from "./pages/Home/Home"
import PropertyDetail from './pages/Home/PropertyDetail'
import ResidentsPages from "./pages/Residents/Residents"
import Profile from "./pages/Profile/Profile"
import Footer from "./pages/Forms/publicator/FooterPublicator"
import BeneficiosArrendadores from "./pages/Forms/publicator/beneficPublicator"
import FormPublication from "./pages/Forms/publicator/formPublicator"
import RentSpaceBanner from "./pages/Forms/publicator/publicatorRoom"
import RegisterForm from "./pages/Forms/RegisterForm"
import AdminRoomsView from "./pages/administrator/RoomAdministrator"

function App() {
  return (
    <>
     {/* <Profile/> 
      <Home/>  */}
         {/* <LoginForm/>   */}
         {/* <ResidentsPages/>    
        <RentSpaceBanner />
        <FormPublication/>
        <BeneficiosArrendadores />
          <Footer /> */}
          
        {/* <RegisterForm /> */}
        {/* <AdminRoomsView />    */}
        <PropertyDetail/>
    </>
  )
}

export default App