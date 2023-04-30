import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    Union-App
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to Union-App' />
                        <Header as='h3' inverted content='Go and see what is going on around you and the world' />
                        <br>
                        </br>
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to Union-App!
                        </Button>
                    </>

                ) : (
                        <>
                        <Header as='h3' inverted content='Connect with friends and the world around you on UnionApp' />

                            <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted color='blue'>
                                Log in!
                            </Button>
                            <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted color='green'>
                                Create new acc!
                            </Button>
                        </>

                    )}
            </Container>
        </Segment>
    )
})