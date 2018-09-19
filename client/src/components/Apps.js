import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getApps } from '../reducers/apps'
import {
  Container, 
  Header,
  Card,
  Image,
} from 'semantic-ui-react'

class Apps extends React.Component {
  componentDidMount() {
    this.props.dispatch(getApps())
  }

  apps = () => {
    return this.props.apps.map( app => {
      const { name, id, category, author, logo } = app
      return (
        <Card key={id}>
          <Image src={logo} />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>
              <span>{author}</span>
            </Card.Meta>
            <Card.Description>
              {category}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/apps/${app.id}`}>
              View App
            </Link>
          </Card.Content>
        </Card>
      )
    })
  }

  render() {
    return (
      <Container>
        <Header as="h3" textAlign="center">Apps</Header>
        <Card.Group itemsPerRow={4} stackable>
          { this.apps() }
        </Card.Group>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { apps: state.apps }
}

export default connect(mapStateToProps)(Apps)