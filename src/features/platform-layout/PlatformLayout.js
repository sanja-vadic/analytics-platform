import React from "react";
import { Layout } from "antd";
import SideMenu from "../side-menu/SideMenu";
import AppHeader from "../app-header/AppHeader";
import styles from "./PlatformLayout.module.css";

const { Sider, Content } = Layout;

const PlatformLayout = (props) => {
   return (
      <Layout>
         <AppHeader />
         <Layout>
            <Sider width="256">
               <SideMenu className={styles.sideMenu} />
            </Sider>
            <Content className={styles.content}>{props.children}</Content>
         </Layout>
      </Layout>
   );
};

export default PlatformLayout;
