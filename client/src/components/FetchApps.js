import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { getApps } from '../reducers/apps'
import {
  Loader, 
  Segment,
  Dimmer,
} from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import Apps from './Apps'
import AppView from './AppView'

class FetchApps extends React.Component {
  state = { loaded: false }

  componentDidMount() {
    this.props.dispatch(getApps(this.setLoaded))
  }

  setLoaded = () => {
    this.setState({ loaded: true })
  }

  render() {
    const { loaded } = this.state
    if (loaded) {
      return (
        <Fragment>
          <Route exact path="/apps" component={Apps} />
          <Route exact path="/apps/:id" component={AppView} />
        </Fragment>
      )
    } else {
      return (
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </Segment>
      )
    }
  }
}

export default connect()(FetchApps)