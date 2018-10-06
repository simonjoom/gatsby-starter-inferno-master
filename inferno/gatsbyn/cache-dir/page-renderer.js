import React, { createElement } from "react"
import PropTypes from "prop-types"
import { publicLoader } from "./loader"
import { apiRunner,apiRunnerAsync } from "./api-runner-browser"

import shallowCompare from 'shallow-compare';

// Renders page
class PageRenderer extends React.Component {

  constructor(props) {
    super(props) 
    this.state={wrappedPage:null} 
  }

componentDidMount(){
    
    const props = {
      ...this.props,
      pathContext: this.props.pageContext,
    } 

    const [replacementElement] = apiRunner(`replaceComponentRenderer`, {
      props: this.props,
      loader: publicLoader,
    })

    const pageElement =
      replacementElement ||
      createElement(this.props.pageResources.component, {
        ...props,
        key: this.props.location.pathname,
      })

    const wrappedPage = apiRunnerAsync(
      `wrapPageElement`,
      { element: pageElement, props },
      pageElement,
      ({ result }) => {
        return { element: result, props }
      }
    )
    wrappedPage.then((end)=>{
    this.setState({wrappedPage:end})
}) 
} 


componentDidUpdate(nextprops, prevState) {  
if(nextprops.location!==this.props.location){
	const props = {
      ...this.props,
      pathContext: this.props.pageContext,
    }

    const [replacementElement] = apiRunner(`replaceComponentRenderer`, {
      props: this.props,
      loader: publicLoader,
    })

    const pageElement =
      replacementElement ||
      createElement(this.props.pageResources.component, {
        ...props,
        key: this.props.location.pathname,
      })

    const wrappedPage = apiRunnerAsync(
      `wrapPageElement`,
      { element: pageElement, props },
      pageElement,
      ({ result }) => {
        return { element: result, props }
      }
    )
     wrappedPage.then((end)=>{
    this.setState({wrappedPage:end})
})
} 
}

  render() {  
    return this.state.wrappedPage 
  }
}
/*
// Renders page
class PageRenderer extends React.Component {
  render() {
    const props = {
      ...this.props,
      pathContext: this.props.pageContext,
    }

    const [replacementElement] = apiRunner(`replaceComponentRenderer`, {
      props: this.props,
      loader: publicLoader,
    })

    const pageElement =
      replacementElement ||
      createElement(this.props.pageResources.component, {
        ...props,
        key: this.props.location.pathname,
      })

    const wrappedPage = apiRunner(
      `wrapPageElement`,
      { element: pageElement, props },
      pageElement,
      ({ result }) => {
        return { element: result, props }
      }
    ).pop()

    return wrappedPage
  }
}*/

PageRenderer.propTypes = {
  location: PropTypes.object.isRequired,
  pageResources: PropTypes.object.isRequired,
  data: PropTypes.object,
  pageContext: PropTypes.object.isRequired,
}

export default PageRenderer