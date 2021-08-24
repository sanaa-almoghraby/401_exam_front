import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Row,Col,Button} from 'react-bootstrap'
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      datadb: [],
    }
  }
  componentDidMount = async () => {
    let resdata = await axios.get(`${process.env.REACT_APP_SERVER}/dataapi`)
    this.setState({
      datadb: resdata.data
    })
  }
  // http://localhost:3004/addtofav
  addtofav=async (index)=>{
    const newopj={
      email:this.props.auth0.user.email,
      name:this.state.datadb[index].name,
      photo:this.state.datadb[index].photo,
      instructions:this.state.datadb[index].instructions,

    }
    await axios.post(`${process.env.REACT_APP_SERVER}/addtofav`,newopj)
  }


  render() {
    return (
      <>
        <h1>API Flowers</h1>
        <Row xs={1} md={4} className="g-4">
          {this.state.datadb.map((ele, idx) => (
            <Col>
              <Card>
                <Card.Img variant="top" src={ele.photo} />
                <Card.Body>
                  <Card.Title>{ele.name}</Card.Title>
                  <Card.Text>
                    {ele.instructions}
                  </Card.Text>
                  <Button variant="primary" onClick={()=>{this.addtofav(idx)}} >ADD TO FAV</Button>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    )
  }
}

export default withAuth0(Home) ;
