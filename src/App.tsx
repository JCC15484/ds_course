import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Practice from './pages/Practice';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import LearningPath from './pages/LearningPath';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Community from './pages/Community';
import PandasTraining from './pages/PandasTraining';
import LearningCenter from './pages/LearningCenter';
import SqlLearning from './pages/SqlLearning';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/practice/:id" element={<Practice />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/community" element={<Community />} />
            <Route path="/pandas-training" element={<PandasTraining />} />
            <Route path="/learning-center" element={<LearningCenter />} />
            <Route path="/sql-learning" element={<SqlLearning />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
