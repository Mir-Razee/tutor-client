import axios from "axios";
import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Carousel from 'react-elastic-carousel';
import "./Card.css";
// import Data from '../../data/Data';
import { Link } from 'react-router-dom';

// import CourseInfo from "../../pages/courseinfo/CourseInfo";

const breakPoints = [
  {width:296,itemsToShow:1,itemsToScroll:1},
  {width:600,itemsToShow:2,itemsToScroll:2},
  {width:908,itemsToShow:3,itemsToScroll:3},
  {width:1200,itemsToShow:4,itemsToScroll:4},
  {width:1500,itemsToShow:5,itemsToScroll:5},

];

const renderCard = (CardInfo) => {
  return (
    
    <Card xs={{ maxWidth: 345 }} key={CardInfo._id} className="box" >
      <img src={CardInfo.image} alt={CardInfo.title} height="150" width="256"/>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {CardInfo.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {CardInfo.course}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">BUY</Button>
        <Button 
          size="small" 
          >
            <Link to={'/courseinfo/'+ CardInfo._id} state={{desc: CardInfo.desc, course: CardInfo.course, title: CardInfo.title, image: CardInfo.image}} >Learn More</Link>
        </Button>
        
      </CardActions>
    </Card>
  );
};

class CourseCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
    };
  }

  componentDidMount() {
    axios.get("/subject").then((response) => {
      this.setState({ subjects: response.data });
      //console.log(response.data);
    });
  }

  render() {
    const { subjects } = this.state;
    var CardInfo = [];
    for (let i = 0; i < subjects.length; i++) {
      let x = {};
      x._id = subjects[i]._id;
      x.image = subjects[i].image;
      x.title = subjects[i].title;
      x.course = subjects[i].course;
      x.desc = subjects[i].desc;
      CardInfo.push(x);
    }
    
    return (
        <>
        <div className="grid">
          <Carousel breakPoints={breakPoints}>
            {CardInfo.map(renderCard)}
          </Carousel>
        </div>
        </>
    );
  }
}

export default CourseCard;
    
