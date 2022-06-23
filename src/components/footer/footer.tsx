import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <div className="text-center px-3 py-3 text-xs border-t border-gray-300">
          Copyright &#169; 2003-{new Date().getFullYear()} MotionPoint Corporation. All Rights Reserved. -
           <Link to="/tmv2/terms-of-use" className="text-blue-700">Terms of Use.</Link> -
           <Link to="/tmv2/privacy-policy" className="text-blue-700">Privacy Policy.</Link>
      </div>
    )
}

export default Footer;