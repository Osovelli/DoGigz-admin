import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import SignUp from "./Pages/Auth/SignUp"
import VerifyEmail from "./Pages/Auth/VerifyEmail"
import UserType from "./Pages/Auth/UserType"
import GigPreferences from "./Pages/Auth/GigPreference"
import IdentityVerification from "./Pages/Auth/IdentityVerification"
import DocumentVerification from "./Pages/Auth/DocumentVerification"
import VerificationDetails from "./Pages/Auth/VerificationDetails"
import LivenessCheck from "./Pages/Auth/LivenessCheck"
import CompleteProfile from "./Pages/Auth/CompleteProfile"
import JobPreferences from "./Pages/Auth/JobPreference"
import Login from "./Pages/Auth/Login"
import ResetPassword from "./Pages/Auth/ResetPassword"
/* import LandingPage from "./Pages/LandingPage"
import LandingLayout from "./components/Landing/LandingLayout"
import Overview from "./Pages/Overview" 
import GigDetails from "./Pages/GigDetails"*/
import DashboardLayout from "./components/Dashboard/DashboardLayout"
import CreateCourse from "./Pages/CreateCourse"
import MyCreations from "./Pages/MyCreation"
import AddCourseContent from "./Pages/AddCourseContent"
import CoursePreview from "./Pages/CoursePreview"
import SetAvailability from "./Pages/SetAvailability"
import OneOnOneCoursePreview from "./Pages/OneonOneCoursePreview"
import ExplorePage from "./Pages/ExplorePage"
import CourseHistoryPage from "./Pages/CourseHistoryPage"
import SelfPacedCourseDetails from "./Pages/SelfPacedCourseDetailPage"
import OneOnOneCourseDetailsPage from "./Pages/OneOnOneCourseDetailsPage"
import AccountLayout from "./components/Dashboard/AccountLayout"
import EditProfile from "./Pages/Account/EditProfile"
import WorkSamples from "./Pages/Account/WorkSample"
import Notification from "./Pages/Account/Notification"
import ChangePassword from "./Pages/Account/ChangePassword"
import HelpCenter from "./Pages/Account/HelpCenter"
import Terms from "./Pages/Account/Terms"
import Privacy from "./Pages/Account/Privacy"
import Wallet from "./Pages/WalletPage"
import OverviewPage from "./Pages/OverviewPage"
import PostGigPage from "./Pages/PostGigPage"
import MyCasePage from "./Pages/MyCasePage"
import GigOffersPage from "./pages/GigOffersPage"
import MessagesPage from "./pages/MessagesPage"
import VideoCallPage from "./pages/VideoCallPage"
import DashboardHome from "./Pages/Dashboard/DashboardHome"
import UserManagement from "./Pages/Dashboard/UserManagement"
import UserDetails from "./Pages/Dashboard/UserDetails"
import UserDetailsLayout from "./Pages/Dashboard/UserDetailsLayout"
import UserInfo from "./Pages/Dashboard/UserInfo"
import UserWalletManagement from "./Pages/Dashboard/UserWalletManagement"
import CoursesManagement from "./Pages/Dashboard/CourseManagement"
import GigsManagement from "./Pages/Dashboard/GigsManagement"
import Courses from "./Pages/Courses/CourseManagement"
import CourseDetail from "./Pages/Courses/CourseDetail"
import TransactionsManagement from "./Pages/Transaction/TransactionsManagement"
import Gigs from "./Pages/Gigs/GigsManagement"
import GigDetail from "./Pages/Gigs/GigDetail"
import PromoManagement from "./Pages/Promo/PromoManagement"
import PromoDetail from "./Pages/Promo/PromoDetail"
import ChatManagement from "./Pages/Chat/ChatManagement"
import RolesAndPermissions from "./Pages/Roles/Roles&Permission"
import SettingsLayout from "./Pages/Settings/SettingsLayout"
import PrivacyPolicy from "./components/Settings/PrivacyPolicy"
import FAQ from "./components/Settings/FAQ"
import Newsletter from "./components/Settings/Newsletter"
import CreateNewsletter from "./components/Settings/CreateNewletter"
import Profile from "./Pages/Profile/Profile"

// View Transition wrapper
function ViewTransitionWrapper({ children }) {
  const location = useLocation()

  useEffect(() => {
    // Check if the browser supports View Transitions API
    if (!document.startViewTransition) {
      return
    }

    // Start a view transition
    document.startViewTransition(() => {
      // Force a reflow to ensure the transition is applied
      document.documentElement.scrollTop
    })
  }, [location])

  return children
}

function App() {
  return (
    <Router>
      <ViewTransitionWrapper>
      <Routes>
        {/* Auth routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route path="/user-type" element={<UserType />} />
        <Route path="/gig-preferences" element={<GigPreferences />} />
        <Route path="/job-preferences" element={<JobPreferences />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/identity-verification" element={<IdentityVerification />} />
        <Route path="/document-verification" element={<DocumentVerification />} />
        <Route path="/verification-details" element={<VerificationDetails />} />
        <Route path="/liveness-check" element={<LivenessCheck />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Main routes */}
        {/* <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="terms" element={<Terms />} />
        </Route> */}
        
        {/* DoGigz Admin path */}
        <Route path="/dashboard" element={<DashboardLayout />} >
          <Route index element={<DashboardHome />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="transactions" element={<TransactionsManagement />} />
          <Route path="gigs" element={<Gigs />} />
          <Route path="gigs/:id" element={<GigDetail />} />
          <Route path="promo" element={<PromoManagement />} />
          <Route path="promo/:id" element={<PromoDetail />} />
          <Route path="chat" element={<ChatManagement />} />
          <Route path="roles" element={<RolesAndPermissions />} />
          <Route path="profile" element={<Profile />}/>
          {/* <Route path="user-management/:userId" element={<UserDetails />} /> */}
          <Route path="/dashboard/user-management/:userId" element={<UserDetailsLayout />}>
            <Route index element={<UserInfo />} />
            <Route path="wallet" element={<UserWalletManagement />} />
            <Route path="courses" element={<CoursesManagement />} />
            <Route path="gigs" element={<GigsManagement />} />
            {/* <Route path="wallet" element={<UserWallet />} />
            <Route path="courses" element={<UserCourses />} />
            <Route path="gigs" element={<UserGigs />} /> */}
          </Route>
          <Route path="create-course" element={<CreateCourse />} />
          <Route path="add-course-content" element={<AddCourseContent />} />
          <Route path="set-availability" element={<SetAvailability />} />
          <Route path="course-preview" element={<CoursePreview />} />
          <Route path="one-on-one-preview" element={<OneOnOneCoursePreview />} />
          <Route path="creations" element={<MyCreations />} />
          <Route path="course-history" element={<CourseHistoryPage />} />
          <Route path="course/:id" element={<OneOnOneCourseDetailsPage />} />
          <Route path="course/:id/self-paced" element={<SelfPacedCourseDetails />} />
          <Route path="post-gig" element={<PostGigPage />} />
          <Route path="case" element={<MyCasePage />} />
          <Route path="gigs/:id/offers" element={<GigOffersPage />} />
          {/* Add other dashboard routes here */}
            <Route path="/dashboard/account" element={<AccountLayout />}>
              <Route index element={<EditProfile />} />
              <Route path="work-samples" element={<WorkSamples />} />
              <Route path="notification" element={<Notification />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="help-center" element={<HelpCenter />} />
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              {/* Add other account routes as needed */}
            </Route>
            <Route path="/dashboard/settings" element={<SettingsLayout />}>
              <Route index element={<PrivacyPolicy />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="newsletter" element={<Newsletter />} />
              <Route path="newsletter/create" element={<CreateNewsletter />} />
            </Route>
          </Route>
        {/* <Route path="gigs/:id" element={<GigDetails />} /> */}
        <Route path="/dashboard/wallet" element={<Wallet />} />
         {/* Messages and Calls */}
         <Route path="/messages/:id?" element={<DashboardLayout />}>
            <Route index element={<MessagesPage />} />
          </Route>
          <Route path="/video-call/:id" element={<VideoCallPage />} />
          <Route path="/call/:id" element={<VideoCallPage videoOff={true} />} />
      </Routes>
      </ViewTransitionWrapper>
    </Router>
  )
}

export default App