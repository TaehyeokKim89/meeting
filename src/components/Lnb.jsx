import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function LNB() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState([
        { id: 1, name: 'Home', link: '/' },
        { id: 2, name: 'About', link: '/input' },
        { id: 3, name: 'Contact', link: '/contact' },
    ]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = () => {
        setIsOpen(false);
    };

    return (
        <LnbLayout isOpen={isOpen}>
            <button className="menu-btn" onClick={toggleMenu}>
                <div className="menu-icon">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <span className="menu-label"></span>
            </button>
            <div className="menu">
                {items.map((item) => (
                    <div key={item.id}>
                        <Link to={item.link} onClick={handleItemClick}>
                            {item.name}
                        </Link>
                    </div>
                ))}
            </div>
        </LnbLayout>
    );
}

export default LNB;

const LnbLayout = styled.div`
    width: ${({ isOpen }) => (isOpen ? '400px' : '50px')};
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    transition: width 0.3s ease;
    background-color: #fff;

    .menu-btn {
        background-color: #fff;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 10px;
        position: relative;
        z-index: 1;

        .menu-icon {
            width: 24px;
            height: 16px;
            position: relative;
            transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg) translate(-2px, 2px)' : 'none')};
            transition: transform 0.3s ease;

            .line {
                width: 100%;
                height: 2px;
                background-color: #333;
            }

            .line:nth-child(2) {
                transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'none')};
            }

            .line:nth-child(3) {
                display: ${({ isOpen }) => (isOpen ? 'none' : 'block')};
            }
        }

        .menu-label {
            font-size: 16px;
            margin-left: 10px;
        }
    }

    .menu {
        display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
        margin: 10px;
        padding: 10px;
        border: 1px solid #ccc;
    }

    a {
        display: block;
        margin-bottom: 10px;
        color: #333;
        text-decoration: none;
    }
`;
