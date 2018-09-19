import React from 'react'
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

class Apps extends React.Component {
  state = { category: '' }

  categoryOptions = () => {
    const { categories } = this.props
    return categories.map( (c) => { return{ key: c, text: c, value: c } } )
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
            <Card.Header>{name}</Card.Header>
            <Card.Meta><span>{author}</span></Card.Meta>
            <Card.Description>{category}</Card.Description>
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

  handleChange = (e, { value }) => {
    this.setState({ category: value })
  }

  render() {
    const { category } = this.state

    return (
      <Container>
        <Header as="h3" textAlign="center">Apps</Header>
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
              Clear Filter: { category }
            </Button>
        }

        <Card.Group itemsPerRow={4} stackable>
          { this.apps() }
        </Card.Group>
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