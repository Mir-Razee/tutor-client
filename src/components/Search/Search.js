import React, { useState,useEffect} from "react";
import InputGroup from "react-bootstrap/InputGroup";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios"; 
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import  Autocomplete  from "@mui/material/Autocomplete";
import "./styles.css";
import { styled } from "@mui/material/styles";


const StyledAutocomplete = styled(Autocomplete)({
  
  "& .MuiAutocomplete-inputRoot": {
    color: "#B9B8D3",
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      // Default left padding is 6px
      paddingLeft: 26
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "grey"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "aquamarine"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "darksalmon"
    },
    "&.css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicato":{
      color: "white"
    }
  },
  "& .MuiInputLabel-root": {
    color: "#ff6663"
  }
});


const SearchBar=()=> {
    const navigation = useNavigate();
    const [data,getdata] = useState('');
    useEffect(()=>{
      f();
    },[])
 
    const f=()=>{
       axios.get("/subject")
   .then((response) => {
     getdata(response.data);
     //console.log(response.data);
   });
  }
   
    
    const handleSubmit = (event) => {
      event.preventDefault();
      var subjects = data;
      //console.log(event.target.defaultValue)
      var CardInfo = [];
      let y = {};
      for (let i = 0; i < subjects.length; i++) {  
        if(subjects[i].course===event.target.defaultValue)
        {  y._id = subjects[i]._id;
          y.image = subjects[i].image;
          y.title = subjects[i].title;
          y.course = subjects[i].course;
          y.desc = subjects[i].desc;
          CardInfo.push(y);
        }
      }
      console.log(CardInfo[0])
      navigation("/courseinfo/"+ CardInfo[0]._id, {state: {desc: CardInfo[0].desc, course: CardInfo[0].course, title: CardInfo[0].title, image: CardInfo[0].image}})
    };
    
    //console.log(data)
    var subjects = data;
    //console.log(typeof(subjects))
    var SearchInfo = [];
    for (let i = 0; i < subjects.length; i++) {
      let x = {};
      x.course = subjects[i].course;
      x.title = subjects[i].title;
      SearchInfo.push(x);
    }
    // console.log(SearchInfo)
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && SearchInfo.length === 0;

    function sleep(delay = 0) {
      return new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    }
    React.useEffect(() => {
      let active = true;
    
      if (!loading) {
        return undefined;
      }
    
      (async () => {
        await sleep(1e3); // For demo purposes.
    
        if (active) {
          // setOptions([...SearchInfo]);
        }
      })();
    
      return () => {
        active = false;
      };
    }, [loading]);
    
    React.useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);
    

    return(
        <InputGroup className="me" direction="row">
          <StyledAutocomplete
            disablePortal
            id="combo-box-demo"
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            autoComplete
            selectOnFocus
            options={SearchInfo}
            getOptionLabel={(option) => option.course}
            groupBy={(option) => option.title.substring(0,2)}
            loading={loading}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Course" InputProps={{...params.InputProps,endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
              )}} 
            />}
            onKeyDown={(event,value) => 
              {if(event.key === 'Enter')
              handleSubmit(event)
              }
            }    
          />
        </InputGroup>
    );
  }


export default SearchBar;