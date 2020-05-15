import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Bonde from './Bonde';


const Fullpage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 52px;
  font-family: 'Roboto', sans-serif;
  
  .main {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 120px 0 0;
  }

  .content {
    width: 428px;
    margin-left: 70px;

    h2 {
      font-size: 70px;
      font-weight: 900;
      line-height: 66px;
      margin: 20px 0;
    }
    
    p {
      font-size: 18px;
      line-height: 27px;
      margin: 10px 0;
    }

    a {
      color: rgb(233,97,184);
    }
  }
`

export default function ErrorPage({ children }: any) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href='https://static.bonde.org/static/images/icon/favicon-16.png'
        />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <Fullpage>
        <Bonde />
        <div className='main'>
          {children}
        </div>
      </Fullpage>
    </>
  );
}