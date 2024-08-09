import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './Layout.jsx';
import Home from "./pages/Home.jsx";
import { SignUp } from './pages/SignUp.jsx';
import { Login } from './pages/Login.jsx';
import { AuthProvider } from "./hooks/AuthContext.jsx";
import { JoinedTeams } from "./pages/JoinedTeams.jsx";
import { CreatedTeams } from "./pages/CreatedTeams.jsx";
import TeamsLayout from "./TeamsLayout.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import { JoinForm } from "./pages/JoinForm.jsx";
import { CreateForm } from "./pages/CreateForm.jsx";
import LeaderTask from "./pages/LeaderTask.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import AddTask from "./components/AddTask.jsx";
import GenLayout from "./GenLayout.jsx";
import DedicatedTaskL from "./pages/DedicatedTaskL.jsx";
import Calendar from "./pages/MyCalender.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import EditTask from "./pages/EditTask.jsx";
import TaskFilesLinks from "./components/FileLinkRemove.jsx";
import MemberAssigned from "./pages/MemberAssigned.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/task-tracker" element={<ProtectedRoutes><TeamsLayout/></ProtectedRoutes>}>
            <Route path="created" element={<CreatedTeams />}>
              {/* <Route path=":teamId" element={<GenLayout/>}>
                <Route index element={<LeaderTask/>}/>
                <Route path="create" element={<CreateTask/>}/>                
                <Route path=":task" element={<GenLayout/>}>
                  <Route index element={<DedicatedTaskL/>}/>
                  <Route path='edit' element={<AddTask/>}/>
                  <Route path="assign" element={<AddTask/>}/>
                </Route>               
                               
              </Route> */}
            </Route>
            <Route index element={<DashBoard/>}/>
            <Route path="team" element={<GenLayout/>}>
              <Route path=":teamId" element={<LeaderTask/>}/>
              <Route path=":teamId/create" element={<CreateTask/>}/>
            </Route>
            <Route path="task" element={<GenLayout/>}>
              <Route path=":task" element={<DedicatedTaskL/>}/>
              <Route path=':task/edit' element={<EditTask/>}/>
              <Route path=":task/assign" element={<AddTask/>}/>
              <Route path=":task/fileremove" element={<TaskFilesLinks/>}/>
              <Route path=":task/deassign" element={<MemberAssigned/>}/>
            </Route>
            <Route path="createteam" element={<CreateForm />} />
            <Route path="joined" element={<JoinedTeams />}>
                {/* <Route path=":teamId" element={<GenLayout/>}>
                  <Route index element={<LeaderTask/>}/>               
                  <Route path=":task" element={<DedicatedTaskL/>}/>                             
                </Route> */}
            </Route>
            <Route path="jointeam" element={<JoinForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;