// pages/_app.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../styles/globals.css';
import Layout from './layout';

const MyApp = ({ Component, pageProps }: any) => {
    return (
        <Provider store={store} >

            <Layout>

                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default MyApp;

