import React, { useState } from 'react'
import styles from './sign_in.module.scss'
import backImage from '../../../assets/images/Main.jpg'
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import classNames from 'classnames';



const SignIn = () => {

    const [signInActive, setSignInActive] = useState(false)
    const [logInActive, setLogInActive] = useState(false)


    const handleSignActive = () => {

        setSignInActive(prev => !prev)

        setLogInActive(next => !next)
    }


    return (

        <>
            <div className={styles.container}>

                <img src={backImage} alt="" className={styles.container_background} />

                <div className={styles.content}>

                    <div className={classNames(styles['log-in'], { [styles['log-in-active']]: logInActive })}>

                        <div className={styles['log-in_heading']}><h3>Log In </h3></div>
                        <div className={styles['log-in_content']}>

                            <div className={styles['log-in_content_bymedia']}>

                                <button className={styles['facebook-btn']}><FaFacebookSquare className={styles['facebook-btn_icon']} /> Login with Facebook</button>
                                <button className={styles['google-btn']}><FcGoogle className={styles['google-btn_icon']} /> Login with Google</button>
                                <p>or</p>
                            </div>

                            <div className={styles['log-in_content_inputs']}>
                                <input type="mail" placeholder='Email' className={styles['mail-input']} />
                                <input type="password" placeholder='Password' className={styles['password-input']} />

                            </div>

                            <div className={styles['log-in_content_actions']}>

                                <label htmlFor="remember">
                                    <input type="checkbox" id='remember' />Remember me</label>
                                <p className={styles.forgot} onClick={handleSignActive}>Forgot Password?</p>

                            </div>
                            <div className={styles['log-in_content_buttons']}>

                                <button className={styles['log-in-btn']}>Log in</button>
                            </div>

                        </div>


                    </div>

                    <div className={classNames(styles['sign-in'], { [styles['sign-in-active']]: signInActive })}>

                        <div className={styles['sign-in_heading']}><h3>Sign In </h3></div>
                        <div className={styles['sign-in_content']}>

                            <div className={styles['sign-in_content_bymedia']}>

                                <button className={styles['facebook-btn']}><FaFacebookSquare className={styles['facebook-btn_icon']} /> Login with Facebook</button>
                                <button className={styles['google-btn']}><FcGoogle className={styles['google-btn_icon']} /> Login with Google</button>
                                <p>or</p>
                            </div>

                            <div className={styles['sign-in_content_inputs']}>
                                <input type="mail" placeholder='Email' className={styles['mail-input']} />
                                <input type="password" placeholder='Password' className={styles['password-input']} />

                            </div>

                            <div className={styles['sign-in_content_actions']}>

                                <label htmlFor="remind">
                                    <input type="checkbox" id='rem'/>Remember me</label>
                                <p className={styles.forgot} onClick={handleSignActive}>Already Client?</p>

                            </div>
                            <div className={styles['sign-in_content_buttons']}>

                                <button className={styles['sign-in-btn']}>Sign in</button>
                            </div>

                        </div>


                    </div>

                </div>

            </div>


        </>

    )
}

export default SignIn