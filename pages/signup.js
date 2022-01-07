import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Message, Segment, TextArea, Divider } from 'semantic-ui-react';
import CommonInputs from '../components/Common/CommonInputs';
import { HeaderMessage, FooterMessage } from '../components/Common/WelcomeMessage';
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

export default function signup() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        bio: "",
        facebook: "",
        github: "",
        twitter: "",
    });

    const { name, email, password, bio } = user;
    
    const [showSocialLinks, setShowSocialLinks] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const [username, setUsername] = useState('');
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        const isUser = Object.values({ name, email, password, bio }).every(item => Boolean(item));
        isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
    }, [user]);

    const handleSubmit = e => {
        e.preventDefault();
    }

    const handleChange = e => {
        const { name, value } = e.target;

        setUser(prev => ({ ...prev, [name]: value }));
    }

    return (
        <>
            <HeaderMessage />

            <Form
                loading={ formLoading }
                error={ errorMsg !== null }
                onSubmit={ handleSubmit }
            >
                <Message
                    error header="Oops!"
                    content={ errorMsg }
                    onDismiss={ () => setErrorMsg(null) }
                />

                <Segment>
                    <Form.Input
                        label="Name"
                        placeholder="Name"
                        name="name"
                        value={ name }
                        onChange={ handleChange }
                        fluid
                        icon="user"
                        iconPosition="left"
                        required
                    />
                    
                    <Form.Input
                        loading={ usernameLoading }
                        error={ !usernameAvailable }
                        label="Username"
                        placeholder="Username"
                        name="username"
                        value={ username }
                        onChange={ (e) => {
                            setUsername(e.target.value)
                            
                            if (regexUserName.test(e.target.value)) {
                                setUsernameAvailable(true)
                            } else {
                                setUsernameAvailable(false)
                            }
                        }}
                        fluid
                        icon={ usernameAvailable ? "check" : "close" }
                        iconPosition="left"
                        required
                    />

                    <Form.Input
                        label="Email"
                        placeholder="Email"
                        name="email"
                        value={ email }
                        onChange={ handleChange }
                        fluid
                        icon="envelope"
                        iconPosition="left"
                        type="email"
                        required
                    />

                    <Form.Input
                        label="Password"
                        placeholder="Password"
                        name="password"
                        value={ password }
                        onChange={ handleChange }
                        fluid
                        icon={{
                            name: "eye",
                            circular: true,
                            link: true,
                            onClick: () => {
                                setShowPassword(!showPassword)
                            }
                        }}
                        iconPosition="left"
                        type={ showPassword ? 'text' : 'password' }
                        required
                    />

                    <CommonInputs
                        user={ user }
                        showSocialLinks={ showSocialLinks }
                        setShowSocialLinks={ setShowSocialLinks }
                        handleChange={ handleChange }
                    />

                    <Divider hidden />

                    <Button
                        content="Signup"
                        type="submit"
                        color="orange"
                        disabled={ submitDisabled || !usernameAvailable }
                    />
                </Segment>
            </Form>

            <FooterMessage />
        </>
    )
}
