import React from "react";
import Container  from 'react-bootstrap/Container';
import { useLocation } from 'react-router-dom'
import "./styles.css"
import { Grid, Paper } from "@mui/material";
import TutorCard from "../../components/TutorCard/TutorCard";

const CourseInfo=()=>{
    const location = useLocation()
    const {qual} = location.state
    const {exp} = location.state
    const {name} = location.state
    const {email} = location.state

    const myStyle = {
        backgroundImage: "linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url()",
        backgroundRepeat: 'no-repeat',
        width:'97.2%',
        height: '450px',
        color: 'white',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // fontSize: 67,
        //position:'absolute',
    };
    return(
        <>
        <header className="site-head">
            <div className="cont">
            <div className="site-banner">
            <h1 className="site-banner-title">Tutor Information</h1>
            {/* <p className="site-banner-desc">Explore renowned tutors</p> */}
        </div>
            </div>
        </header><br/><br/>
        <Container>
        <Paper variant="outlined">
        <Container>
        
        <div className="card" style={myStyle}>
        <Container>
          <div className="card-block">
            <h2>{name}</h2>
            <hr className="style"/>
            <div className="row">
              <div className="col-md-4">
                <p><img src="#" className="img-responsive" width="300" height="180" alt={name}/></p>
              </div>
              <div className="col-md-8">

                <h4>{email}</h4>
                
                <p>{qual}</p>
              <br/><br/><br/><br/>
                <p><button ><b>Enroll Now »</b></button></p>

              </div>
            </div>
          </div>
          </Container>
        </div>
        </Container>
        </Paper>
        </Container>
        <br/><br/>
        <div>
        <Container>
            <Paper variant="outlined">
                <Container>
                <h2>View More Tutors</h2>
                <hr/>
                <Grid padding={5}>
                    <TutorCard />
                </Grid>
                </Container>
            </Paper>
        </Container>
        </div>
        </>
    )
}
export default CourseInfo;
