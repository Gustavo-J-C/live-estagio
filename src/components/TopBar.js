import '../App.css'
import {MdOndemandVideo} from 'react-icons/md'
import { Link } from 'react-router-dom';


const Topbar = () => {
  return (
    <div className="top_bar">
      <div className="top_bar-links">
        <div className="top_bar-links_logo">
          <MdOndemandVideo size={35} color="#fff"/>
        </div>
        <div className="top_bar-links_container">
          <p>
          <Link to="/sobre">Sobre</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
