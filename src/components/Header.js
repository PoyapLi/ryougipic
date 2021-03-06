import React,{useState, useEffect} from 'react';
import LogoUrl from '../logo.svg'
import {NavLink, useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {Button} from 'antd';
import {useStores} from '../stores';
import { observer } from 'mobx-react';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 22px;
  background: linear-gradient(193deg, rgba(0,0,0,1) 0%, rgba(4,245,255,1) 100%);
  color: #fff;
`;
const Logo = styled.img`
  display: flex;
  height: 32px;
`;
// 因为 NavLink 已经是个组件，需要这种写法
const StyledLink = styled(NavLink)`
  color: #fff;
  margin-left: 16px;
  padding-bottom: 2px;
  font-size: 16px;
  
  &:hover {
    color: #fff;
  }

  &.active {
    border-bottom: 4px solid #015b5f;
  }
`
const Login = styled.div`
  margin-left: auto;
`
const StyledButton = styled(Button)`
  margin-left: 12px;
  border-radius: 12px;
`

const  Component = observer(() => {

  const history = useHistory();

  const [isLogin, setIsLogin] = useState(false);
  const { UserStore, AuthStore } = useStores();

  const handleLogout = () => {
    AuthStore.logout();
  };
  const handleLogin = () => {
    console.log('跳转到登录页面');
    history.push('/login')
  };
  const handleRegister = () => {
    console.log('跳转到注册页面');
    history.push('/register');
  };

  useEffect(()=>{
    UserStore.pullUser()
  },[])

  return (
      <Header>
        <Logo src={LogoUrl} alt=""/>
        <nav>
          <StyledLink to="/" activeClassName="active" exact>首页</StyledLink>
          <StyledLink to="/history" activeClassName="active">历史</StyledLink>
          <StyledLink to="/about" activeClassName="active">关于</StyledLink>
        </nav>
        <Login>
          {
            UserStore.currentUser ? <>
              {UserStore.currentUser.attributes.username}<StyledButton type="primary" onClick={handleLogout}>注销</StyledButton>

            </> : <>
              <StyledButton type="primary" onClick={handleLogin}>登录</StyledButton>
              <StyledButton type="primary" onClick={handleRegister}>注册</StyledButton>
            </>
          }
        </Login>
      </Header>
  )
})

export default Component;