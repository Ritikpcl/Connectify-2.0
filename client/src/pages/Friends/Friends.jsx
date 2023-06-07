import LogoSearch from '../../components/LogoSearch/LogoSearch';
import FollowersCard from '../../components/FollowersCard/FollowersCard';
import NavIcons from '../../components/NavIcons/NavIcons';
import './Friends.css'

const Friends=()=>{
    return(
        <div className='friends'>
            <div className="navbar-div"><NavIcons/></div>
            <LogoSearch/>
            <FollowersCard/>
        </div>
    )
}

export default Friends