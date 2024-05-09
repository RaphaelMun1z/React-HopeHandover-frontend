import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'

// Pages
import Home from '../Pages/Home/Home'
import About from '../Pages/About/About'
import HowWorks from '../Pages/HowWorks/HowWorks';
import Contact from '../Pages/Contact/Contact'

import AvailableDonates from '../Pages/AvailableDonates/AvailableDonates';
import Projects from '../Pages/Projects/Projects';
import UsersDonor from '../Pages/UsersDonor/UsersDonor';
import UsersOrg from '../Pages/UsersOrg/UsersOrg';

import Signin from '../Pages/Signin/Signin';
import Signup from '../Pages/Signup/Signup';

/// Private Access
import ManagementArea from '../Pages/ManagementArea/ManagementArea'
import Profile from '../Pages/Profile/Profile';

import CreateProjectForm from '../components/CreateProjectForm/CreateProjectForm';
import MyProjects from '../Pages/MyProjects/MyProjects';
import SavedProjects from '../Pages/SavedProjects/SavedProjects';
import Acknowledgment from '../Pages/Acknowledgment/Acknowledgment';
import DonationsGived from '../Pages/DonationsGived/DonationsGived';
import CreateDonate from '../Pages/CreateDonate/CreateDonate';
import ProjectItems from '../Pages/ProjectItems/ProjectItems';
import AboutProject from '../Pages/AboutProject/AboutProject';
import AddImageToProjectForm from '../Pages/AddImageToProjectForm/AddImageToProjectForm';
import AddAdress from '../Pages/AddAdress/AddAdress';

import ADMUserStatus from '../Pages/ADMUsersStatus/ADMUsersStatus';
import ADMProjectsStatus from '../Pages/ADMProjectsStatus/ADMProjectsStatus';
import UpdateProjectForm from '../components/UpdateProjectForm/UpdateProjectForm';
import UpdateUserForm from '../components/UpdateUserForm/UpdateUserForm';
import MessagesReceived from '../Pages/MessagesReceived/MessagesReceived';

import Chat from '../Pages/Chat/Chat';
import PageNotFound from '../components/layout/PageNotFound/PageNotFound';

function PublicRoutes() {
    return (
        <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/howitworks' element={<HowWorks />}></Route>
            <Route path='/contact' element={<Contact />}></Route>

            <Route path='/availableDonates' element={<AvailableDonates />}></Route>
            <Route path='/projects' element={<Projects />}></Route>
            <Route path='/projects/about/:project_id' element={<AboutProject />}></Route>
            <Route path='/usersDonor' element={<UsersDonor />}></Route>
            <Route path='/usersOrg' element={<UsersOrg />}></Route>

            <Route path='/chat' element={<Chat />}></Route>

            <Route path='/signin' element={<Signin />}></Route>
            <Route path='/signup' element={<Signup />}></Route>

            {/* Private Access - Just Loggin Auth */}
            <Route path='/management' element={<PrivateRoute><ManagementArea /></PrivateRoute>}></Route>
            <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>}></Route>

            <Route path='/projects/register' element={<PrivateRoute><CreateProjectForm /></PrivateRoute>}></Route>
            <Route path='/projects/my' element={<PrivateRoute><MyProjects /></PrivateRoute>}></Route>
            <Route path='/projects/saved' element={<PrivateRoute><SavedProjects /></PrivateRoute>}></Route>
            <Route path='/projects/createDonate/:id' element={<PrivateRoute><CreateDonate /></PrivateRoute>}></Route>
            <Route path='/projects/addImage/:project_id' element={<PrivateRoute><AddImageToProjectForm /></PrivateRoute>}></Route>

            <Route path='/donates/published' element={<PrivateRoute><ProjectItems /></PrivateRoute>}></Route>
            <Route path='/donates/gived' element={<PrivateRoute><DonationsGived /></PrivateRoute>}></Route>
            <Route path='/addresses/register' element={<PrivateRoute><AddAdress /></PrivateRoute>}></Route>

            <Route path='/acknowledgment' element={<PrivateRoute><Acknowledgment /></PrivateRoute>}></Route>

            <Route path='/adm/users' element={<PrivateRoute><ADMUserStatus /></PrivateRoute>}></Route>
            <Route path='/adm/projects' element={<PrivateRoute><ADMProjectsStatus /></PrivateRoute>}></Route>
            <Route path='/adm/project/edit/:project_id' element={<PrivateRoute><UpdateProjectForm /></PrivateRoute>}></Route>
            <Route path='/adm/user/edit/:user_id' element={<PrivateRoute><UpdateUserForm /></PrivateRoute>}></Route>
            <Route path='/adm/contacts' element={<PrivateRoute><MessagesReceived /></PrivateRoute>}></Route>

            <Route path="*" element={<PageNotFound />} />

        </Routes>
    );
}

export default PublicRoutes;
