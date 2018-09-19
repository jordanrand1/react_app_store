import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Container, 
  Header,
  Card,
  Image,
  Dropdown,
  Divider,
  Button,
} from 'semantic-ui-react'
import AppForm from './AppForm'

class Apps extends React.Component {
  state = { category: '', showForm: false }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm }) 
  }

  categoryOptions = () => {
    const { categories } = this.props
    return categories.map( (c) => { return { key: c, text: c, value: c } } )
  }

  apps = () => {
    const { apps } = this.props
    const { category } = this.state

    let visible = apps

    if (category) 
      visible = apps.filter( a => a.category === category )

    return visible.map( app => {
      const { name, id, category, author, logo } = app
      return (
        <Card key={id}>
          <Image src={logo} />
          <Card.Content>
            <Card.Header>
              {name}
            </Card.Header>
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

  handleChange = (_, { value }) => {
    this.setState({ category: value })
  }

  render() {
    const { category, showForm } = this.state

    return (
      <Container>
        <Header as="h3" textAlign="center">Apps</Header>
        <Button onClick={this.toggleForm}>
          { showForm ? 'Hide Form' : 'Show Form' }
        </Button>
        { showForm ?
            <AppForm closeForm={this.toggleForm} />
            :
            <Fragment>
              <Dropdown
                placeholder="Filter by..."
                fluid
                selection
                options={this.categoryOptions()}
                value={category}
                onChange={this.handleChange}
              />
              { category && 
                  <Button
                    fluid
                    basic
                    onClick={ () => this.setState({ category: '' }) }
                  >
                    Clear Filter: {category}
                  </Button>
              }
              <Divider />
              <Card.Group itemsPerRow={4} stackable>
                { this.apps() }
              </Card.Group>
            </Fragment>
          }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { apps } = state
  const categories = [...new Set(apps.map( a => a.category ))]
  return { apps, categories }
}

export default connect(mapStateToProps)(Apps)

