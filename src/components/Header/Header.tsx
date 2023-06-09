import React, { ReactElement } from 'react';


const Header = (): ReactElement => {

  const changeTheme = (): void => {
  
  const moon: Element | null = document.querySelector('.fa-moon');
  const header: Element | null = document.querySelector('.header');
  const details: NodeListOf<Element> = document.querySelectorAll('.details');
  const uls: NodeListOf<Element> = document.querySelectorAll('ul');
  const back: Element | null = document.querySelector('.back');
  const select: Element | null = document.querySelector('select');
  const input: HTMLInputElement | null = document.querySelector('#search');
  const moonBtn: Element | null = document.querySelector('.moon-btn');
  const borders: NodeListOf<Element> = document.querySelectorAll('.borders');
  
  if (moon && header) {
      document.body.classList.toggle('light-theme');
      header.classList.toggle('light-theme');
      back?.classList.toggle('light-theme');
      select?.classList.toggle('light-theme');
      input?.classList.toggle('light-theme')
      moonBtn?.classList.toggle('light-theme');
      
  
      details.forEach((detail) => {
        detail.classList.toggle('light-theme');
      });
  
      uls.forEach((ul) => {
        ul.classList.toggle('light-theme');
      });
  
      borders.forEach((border) => {
        border.classList.toggle('light-theme');
      })
    
  }
  };
return (
<div className="header">
  <div>
  <h1>Where in the world?</h1>
  </div>
    <div>
        <button className="moon-btn">
        <i className="fas fa-moon" onClick={changeTheme}> Dark Mode</i>
        </button>
    </div>
</div>
  );
};

export default Header;