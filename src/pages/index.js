import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const isInferno=process.env.NODE_ENV==="production"||process.env.NODE_ENV==="inferno";
const TYPE=process.env.NODE_ENV==="production"?"'inferno production'":process.env.NODE_ENV==="inferno"?"'inferno development'":"'normal development'";
const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your Gatsby site in mode <span style={{color:process.env.NODE_ENV==="inferno"?"#ff0000":"#00ff00",fontSize:"40px"}}> {`${TYPE}`}</span>.</p>
    <p>Check the console.</p>
    {isInferno&&<p>Hmr working but hot-reload cannot with inferno. Your bundle is optimized fo production and go fast</p>}
    {!isInferno&&<p>Hmr working and hot-reload.</p>}
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
