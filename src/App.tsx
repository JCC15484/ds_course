import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import LearningCenter from './pages/LearningCenter';
import Practice from './pages/Practice';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import SqlLearning from './pages/SqlLearning';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/learning-center" element={<LearningCenter />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/sql-learning" element={<SqlLearning />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;