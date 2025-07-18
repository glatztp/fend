import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  House, 
  ClockCounterClockwise, 
  Lightbulb, 
  Info, 
  SignIn, 
  Plus, 
  PencilSimple, 
  Trash, 
  SoccerBall,
  User,
  SignOut,
  Calendar,
  Tag,
  Image as ImageIcon,
  ArrowRight,
  TrendUp,
  Star,
  Trophy,
  Target,
  Fire,
  Crown,
  Sparkle,
  Heart,
  Eye,
  Share,
  Link as LinkIcon,
  GameController,
  ShieldCheck,
  Users,
  Gear
} from 'phosphor-react';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Auth Context
const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       // Get user profile to check role
//       fetchUserProfile();
//     }
//   }, [token]);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await axios.get(`${API}/auth/profile`);
//       setUser(response.data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       logout();
//     }
//   };

//   const login = async (username, password) => {
//     try {
//       const response = await axios.post(`${API}/auth/login`, { username, password });
//       const { access_token, role, username: user_name } = response.data;
//       setToken(access_token);
//       localStorage.setItem('token', access_token);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
//       setUser({ username: user_name, role });
//       return true;
//     } catch (error) {
//       console.error('Login error:', error);
//       return false;
//     }
//   };

//   const register = async (username, password) => {
//     try {
//       const response = await axios.post(`${API}/auth/register`, { username, password });
//       const { access_token, role, username: user_name } = response.data;
//       setToken(access_token);
//       localStorage.setItem('token', access_token);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
//       setUser({ username: user_name, role });
//       return true;
//     } catch (error) {
//       console.error('Register error:', error);
//       return false;
//     }
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem('token');
//     delete axios.defaults.headers.common['Authorization'];
//   };

//   const isAdmin = () => {
//     return user && user.role === 'admin';
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, isAdmin }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

const AuthProvider = ({ children }) => {
  const [user] = useState({
    username: '.',
    role: 'admin',
  });

  const login = async () => true;
  const register = async () => true;
  const logout = () => {};
  const isAdmin = () => true;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};


const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Admin Route Protection
const AdminRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  return isAdmin() ? children : null;
};

// Navigation Component
const Navigation = () => {
  const { user, logout, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-lg border-b border-slate-700/50 shadow-2xl z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-xl shadow-lg"
            >
              <SoccerBall size={24} className="text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Football Betting
              </span>
              <span className="text-xs text-slate-400 -mt-1">Pro Tips</span>
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-1">
            {[
              { to: "/", icon: House, label: "Home" },
              { to: "/history", icon: ClockCounterClockwise, label: "History" },
              { to: "/tips", icon: Lightbulb, label: "Tips" },
              { to: "/previous-tips", icon: Star, label: "Previous Tips" },
              { to: "/about", icon: Info, label: "About" }
            ].map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={item.to} className="flex items-center space-x-2 px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 group">
                  <item.icon size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="flex items-center space-x-3">
            {user ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="flex items-center space-x-2 text-sm">
                  <div className="flex items-center space-x-2">
                    {isAdmin() && (
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-2 py-1 rounded-lg border border-yellow-500/30">
                        <Crown size={14} className="text-yellow-400" />
                      </div>
                    )}
                    <span className="text-slate-300">{user.username}</span>
                  </div>
                </div>
                
                {isAdmin() && (
                  <>
                    <Link to="/admin" className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2 rounded-xl text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                      <Gear size={16} />
                      <span className="text-sm font-medium">Admin</span>
                    </Link>
                    <Link to="/create-post" className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-2 rounded-xl text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25">
                      <Plus size={16} />
                      <span className="text-sm font-medium">Create Tip</span>
                    </Link>
                  </>
                )}
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout} 
                  className="flex items-center space-x-2 text-slate-300 hover:text-red-400 transition-colors p-2 rounded-xl hover:bg-slate-800/50"
                >
                  <SignOut size={16} />
                  <span className="text-sm font-medium">Logout</span>
                </motion.button>
              </motion.div>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-xl text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                <SignIn size={18} />
                <span className="text-sm font-medium">Login</span>
              </Link>
            )}
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.div
                  className="w-5 h-0.5 bg-current mb-1"
                  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
                />
                <motion.div
                  className="w-5 h-0.5 bg-current mb-1"
                  animate={{ opacity: isOpen ? 0 : 1 }}
                />
                <motion.div
                  className="w-5 h-0.5 bg-current"
                  animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-slate-700/50"
            >
              <div className="space-y-2">
                {[
                  { to: "/", icon: House, label: "Home" },
                  { to: "/history", icon: ClockCounterClockwise, label: "History" },
                  { to: "/tips", icon: Lightbulb, label: "Tips" },
                  { to: "/previous-tips", icon: Star, label: "Previous Tips" },
                  { to: "/about", icon: Info, label: "About" }
                ].map((item) => (
                  <Link 
                    key={item.to}
                    to={item.to} 
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                ))}
                {isAdmin() && (
                  <>
                    <Link to="/admin" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-purple-400 hover:text-white hover:bg-slate-800/50 transition-all" onClick={() => setIsOpen(false)}>
                      <Gear size={20} />
                      <span>Admin Panel</span>
                    </Link>
                    <Link to="/create-post" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-emerald-400 hover:text-white hover:bg-slate-800/50 transition-all" onClick={() => setIsOpen(false)}>
                      <Plus size={20} />
                      <span>Create Tip</span>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 180 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-xl"
              >
                <SoccerBall size={24} className="text-white" />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Football Betting
                </h3>
                <p className="text-xs text-slate-400 -mt-1">Pro Tips</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your trusted source for professional football betting insights and winning strategies.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center space-x-2">
              <Trophy size={18} className="text-emerald-400" />
              <span>Quick Links</span>
            </h4>
            <div className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/tips", label: "Tips of the Day" },
                { to: "/about", label: "About" },
                { to: "/history", label: "History" }
              ].map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center space-x-2">
              <Target size={18} className="text-emerald-400" />
              <span>Features</span>
            </h4>
            <div className="space-y-2 text-sm text-slate-400">
              <p>• Expert betting analysis</p>
              <p>• Daily tips & insights</p>
              <p>• Game predictions</p>
              <p>• Betting links</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center space-x-2">
              <Fire size={18} className="text-emerald-400" />
              <span>Contact</span>
            </h4>
            <div className="space-y-2 text-sm text-slate-400">
              <p>Email: admin@footballbettingtips.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Support: 24/7 Available</p>
            </div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-slate-700/50 mt-12 pt-8 text-center"
        >
          <p className="text-slate-400 text-sm">
            &copy; 2025 Football Betting Tips. All rights reserved. | Made with ❤️ for football fans
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

// Loading Component
const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-slate-700 border-t-emerald-500 rounded-full mx-auto mb-4"
      />
      <p className="text-slate-400">{message}</p>
    </div>
  </div>
);

// Post Card Component
const PostCard = ({ post, showActions = false, onEdit, onDelete }) => {
  const { isAdmin } = useAuth();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-600/30 hover:border-emerald-500/50 transition-all duration-500"
    >
      {(post.image_base64 || post.fixed_tip_image) && (
        <div className="relative overflow-hidden">
          <img 
            src={post.image_base64 ? `data:image/jpeg;base64,${post.image_base64}` : post.fixed_tip_image}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-emerald-500/30 w-fit">
              <Tag size={14} className="text-emerald-400" />
              <span className="text-emerald-400 text-xs font-medium capitalize">
                {post.category}
              </span>
            </div>
            {showActions && isAdmin() && (
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(post)}
                  className="bg-blue-500/20 backdrop-blur-sm p-2 rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-all"
                >
                  <PencilSimple size={14} className="text-blue-400" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete(post)}
                  className="bg-red-500/20 backdrop-blur-sm p-2 rounded-full border border-red-500/30 hover:bg-red-500/30 transition-all"
                >
                  <Trash size={14} className="text-red-400" />
                </motion.button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors leading-tight">
          {post.title}
        </h3>
        
        {post.game_details && (
          <div className="flex items-center space-x-2 mb-3">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-1 rounded-lg">
              <GameController size={16} className="text-blue-400" />
            </div>
            <span className="text-blue-400 text-sm font-medium">{post.game_details}</span>
          </div>
        )}
        
        <p className="text-slate-400 mb-4 line-clamp-3 leading-relaxed">
          {post.content.substring(0, 120)}...
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-slate-500 text-sm">
            <Calendar size={14} />
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
          
          {post.betting_link && (
            <motion.a
              href={post.betting_link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 rounded-full text-white text-sm hover:from-emerald-600 hover:to-teal-600 transition-all"
            >
              <LinkIcon size={14} />
              <span>Bet Now</span>
            </motion.a>
          )}
        </div>
        
        <div className="flex items-center space-x-4 text-slate-500 text-sm">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-1 hover:text-emerald-400 transition-colors"
          >
            <Eye size={14} />
            <span>View</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-1 hover:text-emerald-400 transition-colors"
          >
            <Heart size={14} />
            <span>Like</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-1 hover:text-emerald-400 transition-colors"
          >
            <Share size={14} />
            <span>Share</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Page Components
const Home = () => {
  const [latestPost, setLatestPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestPost();
  }, []);

  const fetchLatestPost = async () => {
    try {
      const response = await axios.get(`${API}/posts/latest`);
      setLatestPost(response.data);
    } catch (error) {
      console.error('Error fetching latest post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading latest betting tips..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative container mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-3xl shadow-2xl">
              <Trophy size={48} className="text-white" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Football Betting
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Professional insights, expert analysis, and winning strategies for smart football betting
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl" />
            <img 
              src="https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxzcG9ydHMlMjBiZXR0aW5nfGVufDB8fHx8MTc1MjgwMTgwNHww&ixlib=rb-4.1.0&q=85"
              alt="Football Action"
              className="relative w-full h-96 md:h-[500px] object-cover rounded-3xl shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Latest Post Section */}
      <div className="relative -mt-16 pb-20">
        <div className="container mx-auto px-4">
          {latestPost ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-600/30"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-xl">
                      <Fire size={20} className="text-white" />
                    </div>
                    <span className="text-emerald-400 font-semibold">Latest Tip</span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 px-4 py-2 rounded-full border border-emerald-500/30"
                  >
                    <Tag size={16} className="text-emerald-400" />
                    <span className="text-emerald-400 text-sm font-medium capitalize">
                      {latestPost.category}
                    </span>
                  </motion.div>
                </div>
                
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
                >
                  {latestPost.title}
                </motion.h2>
                
                {latestPost.game_details && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center space-x-3 mb-6"
                  >
                    <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-2 rounded-xl">
                      <GameController size={20} className="text-blue-400" />
                    </div>
                    <span className="text-blue-400 font-medium">{latestPost.game_details}</span>
                  </motion.div>
                )}
                
                {(latestPost.image_base64 || latestPost.fixed_tip_image) && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="relative mb-8"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl" />
                    <img 
                      src={latestPost.image_base64 ? `data:image/jpeg;base64,${latestPost.image_base64}` : latestPost.fixed_tip_image}
                      alt={latestPost.title}
                      className="relative w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
                    />
                  </motion.div>
                )}
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap mb-8"
                >
                  {latestPost.content}
                </motion.div>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="flex items-center justify-between text-slate-400 text-sm border-t border-slate-600/30 pt-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>Posted on {new Date(latestPost.created_at).toLocaleDateString()}</span>
                    </div>
                    {latestPost.betting_link && (
                      <motion.a
                        href={latestPost.betting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 rounded-full text-white hover:from-emerald-600 hover:to-teal-600 transition-all"
                      >
                        <LinkIcon size={16} />
                        <span>Bet Now</span>
                      </motion.a>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center space-x-1 hover:text-emerald-400 transition-colors"
                    >
                      <Heart size={16} />
                      <span>Like</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center space-x-1 hover:text-emerald-400 transition-colors"
                    >
                      <Share size={16} />
                      <span>Share</span>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-slate-600/30">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <div className="bg-gradient-to-r from-slate-600 to-slate-500 p-6 rounded-3xl w-24 h-24 mx-auto flex items-center justify-center">
                    <Sparkle size={32} className="text-white" />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">No betting tips yet!</h3>
                <p className="text-slate-400 text-lg">Check back soon for the latest professional football betting insights.</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const History = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API}/posts?limit=50`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading post history..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-3xl shadow-2xl">
              <ClockCounterClockwise size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Post History
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Explore our archive of professional football betting insights and analysis
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        
        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-slate-600/30">
              <div className="bg-gradient-to-r from-slate-600 to-slate-500 p-6 rounded-3xl w-24 h-24 mx-auto flex items-center justify-center mb-6">
                <ClockCounterClockwise size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No posts in history yet!</h3>
              <p className="text-slate-400 text-lg">Posts will appear here once you start creating betting tips.</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const TipsOfTheDay = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      const response = await axios.get(`${API}/posts?category=tip`);
      setTips(response.data);
    } catch (error) {
      console.error('Error fetching tips:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading today's tips..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-3xl shadow-2xl">
              <Lightbulb size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Tips of the Day
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Today's hottest football betting tips from our expert analysts
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {tips.map((tip, index) => (
            <PostCard key={tip.id} post={tip} />
          ))}
        </div>
        
        {tips.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-slate-600/30">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-3xl w-24 h-24 mx-auto flex items-center justify-center mb-6">
                <Lightbulb size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No tips available for today!</h3>
              <p className="text-slate-400 text-lg">Check back later for fresh betting insights and analysis.</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const PreviousTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPreviousTips();
  }, []);

  const fetchPreviousTips = async () => {
    try {
      const response = await axios.get(`${API}/posts?category=previous_tip`);
      setTips(response.data);
    } catch (error) {
      console.error('Error fetching previous tips:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading previous tips..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-3xl shadow-2xl">
              <Star size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Previous Tips
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Historical betting tips and their outcomes for analysis and learning
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {tips.map((tip, index) => (
            <PostCard key={tip.id} post={tip} />
          ))}
        </div>
        
        {tips.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-slate-600/30">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-3xl w-24 h-24 mx-auto flex items-center justify-center mb-6">
                <Star size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No previous tips available yet!</h3>
              <p className="text-slate-400 text-lg">Historical tips will appear here once you start archiving your betting insights.</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-3xl shadow-2xl">
              <Info size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Your trusted partner in professional football betting analysis
          </p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-slate-600/30"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl" />
              <img 
                src="https://images.unsplash.com/photo-1581852549708-72910bd52cff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxzcG9ydHMlMjBiZXR0aW5nfGVufDB8fHx8MTc1MjgwMTgwNHww&ixlib=rb-4.1.0&q=85"
                alt="Stadium"
                className="relative w-full h-64 md:h-96 object-cover rounded-3xl shadow-2xl"
              />
            </div>
            
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Your Trusted Football Betting Partner
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto">
                We are passionate about football and dedicated to helping you make informed betting decisions 
                with professional analysis and expert insights.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: Target,
                  title: "Expert Analysis",
                  description: "Professional analysts with years of experience in football betting and statistics.",
                  color: "from-red-500 to-rose-500"
                },
                {
                  icon: TrendUp,
                  title: "Data-Driven Insights",
                  description: "Advanced analytics and statistical models to identify the best betting opportunities.",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: Crown,
                  title: "Proven Track Record",
                  description: "Consistent results and transparent performance tracking for all our predictions.",
                  color: "from-yellow-500 to-orange-500"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  className="text-center"
                >
                  <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-3xl shadow-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center`}>
                    <feature.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="text-slate-300 space-y-8 text-lg leading-relaxed">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-3">
                  <Fire size={24} className="text-orange-400" />
                  <span>What We Offer</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-1 rounded-lg">
                        <ArrowRight size={16} className="text-white" />
                      </div>
                      <span>Daily football betting tips and predictions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-1 rounded-lg">
                        <ArrowRight size={16} className="text-white" />
                      </div>
                      <span>In-depth match analysis and team statistics</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-1 rounded-lg">
                        <ArrowRight size={16} className="text-white" />
                      </div>
                      <span>Expert insights on betting strategies</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-1 rounded-lg">
                        <ArrowRight size={16} className="text-white" />
                      </div>
                      <span>Direct betting links and recommendations</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-1 rounded-lg">
                        <ArrowRight size={16} className="text-white" />
                      </div>
                      <span>Game details and match predictions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-1 rounded-lg">
                        <ArrowRight size={16} className="text-white" />
                      </div>
                      <span>Historical data and trend analysis</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-3">
                  <Heart size={24} className="text-red-400" />
                  <span>Our Mission</span>
                </h3>
                <p className="leading-relaxed">
                  To provide accurate, reliable, and profitable football betting tips while promoting responsible gambling. 
                  We believe in transparency, integrity, and helping our community make informed decisions that enhance 
                  their betting experience and maximize their success.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-3xl p-8"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-xl">
                    <Target size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-yellow-400">Important Disclaimer</h3>
                </div>
                <p className="text-yellow-200 leading-relaxed">
                  Please gamble responsibly. Betting involves risk, and you should never bet more than you can afford to lose. 
                  Our tips are based on professional analysis but should be used for entertainment purposes. 
                  Past performance does not guarantee future results.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = isLogin ? await login(username, password) : await register(username, password);
      if (success) {
        navigate('/');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-20"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md mx-4 border border-slate-600/30"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-3xl shadow-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center"
          >
            <User size={32} className="text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Join Us'}
          </h2>
          <p className="text-slate-400">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl mb-6"
          >
            {error}
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 transition-all"
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 transition-all"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-2xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-blue-500/25 font-medium"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </motion.button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </motion.button>
          </p>
          {!isLogin && (
            <p className="text-slate-500 text-xs mt-2">
              First user registered becomes admin automatically
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [gameDetails, setGameDetails] = useState('');
  const [bettingLink, setBettingLink] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [selectedFixedImage, setSelectedFixedImage] = useState('');
  const [fixedImages, setFixedImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFixedImages();
  }, []);

  const fetchFixedImages = async () => {
    try {
      const response = await axios.get(`${API}/admin/fixed-images`);
      setFixedImages(response.data.fixed_images);
    } catch (error) {
      console.error('Error fetching fixed images:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setSelectedFixedImage(''); // Clear fixed image selection
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFixedImageSelect = (imageKey) => {
    setSelectedFixedImage(imageKey);
    setImage(null); // Clear custom image
    setImagePreview(fixedImages[imageKey]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageBase64 = '';
      if (image) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          imageBase64 = e.target.result.split(',')[1];
          
          const postData = {
            title,
            content,
            category,
            game_details: gameDetails,
            betting_link: bettingLink,
            image_base64: imageBase64,
            fixed_tip_image: null
          };

          await axios.post(`${API}/posts`, postData);
          setSuccess(true);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        };
        reader.readAsDataURL(image);
      } else {
        const postData = {
          title,
          content,
          category,
          game_details: gameDetails,
          betting_link: bettingLink,
          fixed_tip_image: selectedFixedImage ? fixedImages[selectedFixedImage] : null
        };
        await axios.post(`${API}/posts`, postData);
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center"
      >
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl p-12 rounded-3xl shadow-2xl text-center border border-slate-600/30">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 rounded-3xl w-24 h-24 mx-auto mb-6 flex items-center justify-center"
          >
            <Sparkle size={32} className="text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">Tip Created Successfully!</h2>
          <p className="text-slate-400 mb-6">Your betting tip has been published and will appear on the homepage.</p>
          <div className="flex items-center justify-center space-x-2 text-emerald-400">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span>Redirecting to home page...</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <AdminRoute>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-3xl shadow-2xl">
                <Plus size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Create New Tip
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Share your expert football betting insights with the community
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-600/30"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-semibold text-white mb-3">
                      Tip Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-800/50 border border-slate-600/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-slate-400 transition-all text-lg"
                      placeholder="Enter an engaging title for your betting tip..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-lg font-semibold text-white mb-3">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-800/50 border border-slate-600/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white text-lg"
                    >
                      <option value="general">General</option>
                      <option value="tip">Tip of the Day</option>
                      <option value="previous_tip">Previous Tip</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-semibold text-white mb-3">
                      Game Details
                    </label>
                    <input
                      type="text"
                      value={gameDetails}
                      onChange={(e) => setGameDetails(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-800/50 border border-slate-600/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-slate-400 transition-all text-lg"
                      placeholder="e.g., Manchester United vs Liverpool"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-lg font-semibold text-white mb-3">
                      Betting Link
                    </label>
                    <input
                      type="url"
                      value={bettingLink}
                      onChange={(e) => setBettingLink(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-800/50 border border-slate-600/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-slate-400 transition-all text-lg"
                      placeholder="https://betting-site.com/match"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-white mb-3">
                    Content
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={12}
                    className="w-full px-6 py-4 bg-slate-800/50 border border-slate-600/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-slate-400 transition-all text-lg leading-relaxed resize-none"
                    placeholder="Share your detailed analysis, predictions, and betting insights..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-white mb-3">
                    Featured Image
                  </label>
                  
                  {/* Fixed Images Selection */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium text-slate-300 mb-3">Choose from preset images:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {Object.entries(fixedImages).map(([key, url]) => (
                        <motion.div
                          key={key}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFixedImageSelect(key)}
                          className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                            selectedFixedImage === key 
                              ? 'border-emerald-500 ring-2 ring-emerald-500/50' 
                              : 'border-slate-600/30 hover:border-slate-500/50'
                          }`}
                        >
                          <img 
                            src={url} 
                            alt={key}
                            className="w-full h-24 object-cover"
                          />
                          {selectedFixedImage === key && (
                            <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                              <div className="bg-emerald-500 p-1 rounded-full">
                                <Star size={16} className="text-white" />
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Custom Image Upload */}
                  <div>
                    <h4 className="text-md font-medium text-slate-300 mb-3">Or upload your own image:</h4>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-6 py-4 bg-slate-800/50 border border-slate-600/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 transition-all"
                    />
                  </div>

                  {imagePreview && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl" />
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="relative w-full h-64 object-cover rounded-2xl shadow-lg border border-slate-600/30"
                      />
                    </motion.div>
                  )}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-8 rounded-2xl hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-emerald-500/25 font-semibold text-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating Tip...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <Plus size={20} />
                      <span>Create Tip</span>
                    </div>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AdminRoute>
  );
};

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [usersResponse, postsResponse] = await Promise.all([
        axios.get(`${API}/admin/users`),
        axios.get(`${API}/posts?limit=50`)
      ]);
      setUsers(usersResponse.data);
      setPosts(postsResponse.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (post) => {
    if (window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
      try {
        await axios.delete(`${API}/posts/${post.id}`);
        setPosts(posts.filter(p => p.id !== post.id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading admin panel..." />;
  }

  return (
    <AdminRoute>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-3xl shadow-2xl">
                <ShieldCheck size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Manage your football betting tips and user community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-600/30"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-2xl">
                  <SoccerBall size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Total Posts</h3>
                  <p className="text-3xl font-black text-emerald-400">{posts.length}</p>
                </div>
              </div>
              <p className="text-slate-400">Betting tips published</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-600/30"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Total Users</h3>
                  <p className="text-3xl font-black text-blue-400">{users.length}</p>
                </div>
              </div>
              <p className="text-slate-400">Registered members</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-600/30"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-2xl">
                  <Crown size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Admin Users</h3>
                  <p className="text-3xl font-black text-yellow-400">
                    {users.filter(u => u.role === 'admin').length}
                  </p>
                </div>
              </div>
              <p className="text-slate-400">Administrative access</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Posts Management */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-600/30"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                <SoccerBall size={24} className="text-emerald-400" />
                <span>Recent Posts</span>
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {posts.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-2xl">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white truncate">{post.title}</h4>
                      <p className="text-slate-400 text-sm capitalize">{post.category}</p>
                      <p className="text-slate-500 text-xs">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeletePost(post)}
                        className="bg-red-500/20 backdrop-blur-sm p-2 rounded-full border border-red-500/30 hover:bg-red-500/30 transition-all"
                      >
                        <Trash size={16} className="text-red-400" />
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Users Management */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-600/30"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                <Users size={24} className="text-blue-400" />
                <span>Users</span>
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {users.map((user) => (
                  <div key={user.username} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                        <User size={16} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{user.username}</h4>
                        <p className="text-slate-400 text-sm">
                          {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {user.role === 'admin' && (
                        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
                          <span className="text-yellow-400 text-sm font-medium">Admin</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AdminRoute>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <div className="pt-0">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/history" element={<History />} />
                <Route path="/tips" element={<TipsOfTheDay />} />
                <Route path="/previous-tips" element={<PreviousTips />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/admin" element={<AdminPanel />} />
              </Routes>
            </AnimatePresence>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;