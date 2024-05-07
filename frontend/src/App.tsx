
import './App.css'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import React, { Suspense } from 'react'

const Home = React.lazy(() => import('./pages/Home'))
const FreelancerSignin = React.lazy(() => import('./pages/FreelancerSignin'))
const ClientSignin = React.lazy(() => import('./pages/ClientSignin'))
const PostBid = React.lazy(() => import('./pages/PostBid'))
const PostProjects = React.lazy(() => import('./pages/PostProjects'))





function App() {
  return (

    
    <div>
      
       <BrowserRouter>
       
       <Routes>
       <Route path="/" element={<Suspense fallback={"Loading..."}><Home /></Suspense>} /> {/* Set Home page as the default route */}
       <Route path="/FreelancerSignin" element={<Suspense fallback={"Loading..."}><FreelancerSignin />
       </Suspense>} /> 

       <Route path="/ClientSignin" element={<Suspense fallback={"Loading..."}><ClientSignin />
       </Suspense>} /> 
       <Route path="/PostBid" element={<Suspense fallback={"Loading..."}><PostBid />
       </Suspense>} /> 

       

       

       <Route path="/PostProjects" element={<Suspense fallback={"Loading..."}><PostProjects />
       </Suspense>} /> 

       


       </Routes>
       </BrowserRouter>
       </div>
  )
}



export default App