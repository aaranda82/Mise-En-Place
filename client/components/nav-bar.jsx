import React from 'react';
import {
  Link,
  useLocation
} from 'react-router-dom';

const tabs = [{
  path: '/public-page',
  icon: 'fa-hamburger',
  label: 'Public Page'
}, {
  path: '/myRecipes',
  icon: 'fa-star',
  label: 'My Recipes'
}, {
  path: '/mealplan',
  icon: 'fa-clipboard-list',
  label: 'Meal Plan'
}, {
  path: '/account',
  icon: 'fa-user',
  label: 'Account'
}
];

function renderTab({ path, icon, label }, index) {
  const { pathname } = useLocation();
  const isCurrentPath = pathname === path;
  const color = isCurrentPath ? 'white' : 'black';
  return (
    <Link className="black" to={path} key={index}>
      <div className="navBarIconContainer">
        <i className={`fas ${icon} ${color} navBarIcon`}></i>
        <label htmlFor={label} className='navBarLabel'>{label}</label>
      </div>
    </Link>
  );
}

function NavBar() {
  return (
    <div className=" row nav-bar justify-content-between flex-row position-fixed w-100 px-3 align-items-center text-light ">
      {tabs.map(renderTab)}
    </div>

  );
}
export default NavBar;
