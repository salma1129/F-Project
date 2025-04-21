// src/components/Sidebar.js

import React from 'react';
import styled from 'styled-components';
import { User, Briefcase, Clock, Menu } from 'lucide-react';

// Sidebar Component with CSS-in-JS
const SidebarContainer = styled.div`
  width: 200px;
  height: 100vh;
  background-color: #2d3748;
  color: white;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SidebarHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
`;

const SidebarList = styled.ul`
  padding-left: 20px;
  font-size: 20px;
`;

const SidebarListItem = styled.li`
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  color: #cbd5e0;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #4f46e5;
    color: white;
  }
`;

const Sidebar = () => (
  <SidebarContainer>
    <SidebarHeader>Admin Dashboard</SidebarHeader>
    <SidebarList>
      <SidebarListItem>Dashboard</SidebarListItem>
      <SidebarListItem>Employees</SidebarListItem>
      <SidebarListItem>Reports</SidebarListItem>
      <SidebarListItem>Settings</SidebarListItem>
    </SidebarList>
  </SidebarContainer>
);

export default Sidebar;
