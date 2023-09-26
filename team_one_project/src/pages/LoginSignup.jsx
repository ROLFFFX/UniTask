import React from 'react';
import './loginstyle.css';

import nlogo from '../images/UniTaskLOGO.PNG';
import gm from '../images/icons-gmail.png';
import fb from '../images/icons-facebook.png';
import gh from '../images/icons-github.png';


const LoginSignup = () =>{
    return(
        <div className='container'>
            <div className='header'>
                <div className='text'>Sign up</div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <input type="Username"/>
                </div>
                <div className='input'>
                    <input type="Email/Phone"/>
                </div>
                <div className='input'>
                    <input type="Set Password"/>
                </div>
                <div className='input'>
                    <input type="Confirm Password"/>
                </div>
            </div>
            <div className='smalltext'>
                <div className='stxt' id='underheader'>Just some details to get you in!</div>
                <div className='stxtbn' id='registered'>Already Registered? Login</div>
                <div className='stxtbn' id='tac'>Terms & Conditions</div>
                <div className='stxtbn' id='spt'>Support</div>
                <div className='stxtbn' id='cuscr'>Customer Care</div>
            </div>
        </div>
    )
}

export default LoginSignup