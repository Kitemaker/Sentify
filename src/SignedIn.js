import React, { Component } from 'react'
import { UserSession } from 'blockstack'
import InputComp from  './InputComp';
import ScoreCard from './ScoreCard';
import { appConfig } from './constants';
import './SignedIn.css';
import NavBar from './NavBar';


const url = "https://nvxhqhbiwh.execute-api.us-east-1.amazonaws.com/test/blockstack-sentio-api-handler-python?inputText=";
var request = require('request');
var Recaptcha = require('react-recaptcha');




class SignedIn extends Component {

  constructor(props) {
    super(props)
    this.userSession = new UserSession({ appConfig })
    this.state = {
      me: {},
      savingMe: false,
      savingKingdown: false,
      redirectToMe: false
    }

  //  this.loadMe = this.loadMe.bind(this)
  //  this.saveMe = this.saveMe.bind(this)
    this.signOut = this.signOut.bind(this)
  }

TEST_SITE_KEY = "6LeIp6gUAAAAAI8MM2rLbxitRSwy1XISqeamQzj3";
DELAY = 1500;
recaptchaInstance;
  // State to manage for the class
  state = {
    me: {},
    savingMe: false,
    savingKingdown: false,
    redirectToMe: false,
    output:"Default Text",
    text:"",
    sentiment: "",
    positive : "",
    negative: "",
    mixed: "",
    neutral:""
    }
// Coming from templates
  componentWillMount() {
    this.loadMe()
   
  }
  componentDidMount(){
    console.log('msg from componentDidMount');
    let submitBtn = document.getElementById('#submit');
    submitBtn.disabled = true;
  }

  loadMe() {
    // const options = { decrypt: false }
    // this.userSession.getFile(ME_FILENAME, options)
    // .then((content) => {
    //   if(content) {
    //     const me = JSON.parse(content)
    //     this.setState({me, redirectToMe: false})
    //   } else {
    //     const me = null

    //     this.setState({me, redirectToMe: true})
    //   }
    // })
  }

  saveMe(me) {
    // this.setState({me, savingMe: true})
    // const options = { encrypt: false }
    // this.userSession.putFile(ME_FILENAME, JSON.stringify(me), options)
    // .finally(() => {
    //   this.setState({savingMe: false})
    // })
  }

  signOut(e) {
    e.preventDefault()
    this.userSession.signUserOut()
    window.location = '/'
  }


  
// Code for Sentify
getapi =(message) =>{

  request.get(url + this.state.input , (error, response, body) => {
    if(error) {
        return console.log("this error received = " , error);
      }
      console.log('another message');
      console.log("response= " , response , "body = ", body);
      let output = JSON.parse(body); 
      let scores = output.SentimentScore;    
      this.setState({     
        sentiment: output.Sentiment,
        positive : Number(scores.Positive).toPrecision(6),
        negative: Number(scores.Negative).toPrecision(6),
        mixed: Number(scores.Mixed).toPrecision(6),
        neutral:Number(scores.Neutral).toPrecision(6)
      }
      );
  });
  }
  
  onInputChange = (event) => {
    //console.log("message from onInputChange ", event.target.value );
    // eslint-disable-next-line no-template-curly-in-string
    //console.log('state.input = ' + this.state.input  + ' state.outpt =' + this.state.output);
  
    this.setState({
     // output:this.state.output,
      input:event.target.value
    });
    
  }
  
  swithStateHandler = ()=>{
  console.log(document.getElementById('inputbox').nodeValue);
   const textFomUser = document.getElementById('inputbox').nodeValue;
   this.getapi(textFomUser);
   let btn = document.getElementById('#submit');
   btn.disabled=true;
     
  }
  
  getFile = (event) => {
    const input = event.target
    if ('files' in input && input.files.length > 0) {
      console.log(input.files[0]);
      let fname = input.files[0].name;
      let fext = fname.split('.')[fname.split('.').length-1];
      if(fext && (fext.toLowerCase() === 'txt' || fext.toLowerCase() === 'text')){
        this.placeFileContent(
          document.getElementById('content-target'),
          input.files[0])
      }
      else{
        alert('Please select text file.');
      }
     
    }
  }
  
  placeFileContent = (target, file) =>{
    this.readFileContent(file).then(content => {
      //console.log(content);
      this.setState({
        // output:this.state.output,
         text:content
       });
      
    }).catch(error => console.log(error))
  }
  
  readFileContent = (file) => {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result)
      reader.onerror = error => reject(error)
      reader.readAsText(file)
    })
  }



  recaptchaCallback = ()=> {
    console.log('loaded Recaptha !!!!');
  };

  verifyCallback = (token) =>{   
    console.log('ready to verify');
    let btn = document.getElementById('#submit');
    btn.disabled=false;
    };

  resetRecaptcha = () => {
  this.recaptchaInstance.reset();  
  };
  
  render() {
    const username = this.userSession.loadUserData().username
    //const me = this.state.me
    //const redirectToMe = this.state.redirectToMe 
    return (
      <div className="SignedIn">
      <NavBar username={username} signOut={this.signOut}/>     
        <div className="w3-col" style={{minWidth:"100px",overflow:'scroll'}}> 
          <div className="w3-row w3-center">
            <div className="w3-col w3-center " >
            <h2 style={{alignItems:'center'}}>Analyse Sentiments of Text</h2> 
            <div className="w3-row w3-center" style={{padding: '20px', paddingLeft:"20%", paddingRight:"20%", margin:"10px"}}>
            
            <div className="w3-col w3-center " > 
            <p  style={{textAlign:"justify"}}>Get sentiments of your text. Please Enter or copy/paste text in the input box or upload text file (*.txt, *text). 
            Overall sentiment of the input text and sentiment score shall be displayed after analysis of text. Please complete CAPTCHA
            to enable 'Submit' buttom and reset the CAPTCHA to ebnable Submit button after that.</p>  
            </div>
            </div>
              <InputComp input={this.state.input} change={this.onInputChange} id='content-target' text={this.state.text}/>
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-col w3-center "  style={{padding: '20px'}}>
              <h3>Upload Text File</h3>
                <input type="file" id="input-file" onChange={this.getFile}/>  
            </div>      
          </div>   
       
         
          <div className="w3-row w3-center" style={{padding: '20px', paddingLeft:"20%", paddingRight:"20%", margin:"10px"}}>
            
              <div className="w3-col w3-center " >
                <button  id="#submit"  className="w3-btn w3-block w3-teal" style={{  background:'grey', align:'center'}} onClick={this.swithStateHandler}>Submit</button>
                <div >
                    <div className="w3-row w3-center" style={{padding: '20px'}}>
                        <div className="w3-col w3-center" >
                            <Recaptcha  ref={e => this.recaptchaInstance = e}
                                          sitekey={this.TEST_SITE_KEY}
                                          render="explicit"
                                          verifyCallback={this.verifyCallback}
                                          onloadCallback={this.recaptchaCallback}/>
                        </div>
                    </div>
                    <div>
                        <button onClick={this.resetRecaptcha}> Reset Capthca</button>
                    </div>
                </div>
            </div>
          </div>    
          
          
         <div className="w3-row" style={{ paddingLeft:"20%", paddingRight:"20%"}}>
              <div className="w3-col w3-center "  >
                <ScoreCard section= "Text Sentiments" section_score = {this.state.sentiment} />
              </div>
        </div>     
        <div className="w3-row w3-center" style={{  padding:"10px"}}>
            <div className="w3-col l3 m6 s12 "  >
            <ScoreCard section= "Positive" section_score = {this.state.positive} />
            </div>           
            <div className="w3-col l3 m6 s12 "  > 
              <ScoreCard section= "Negative" section_score = {this.state.negative}/>
            </div>       
            <div className="w3-col l3 m6 s12 "  >
            <ScoreCard section= "Mixed" section_score = {this.state.mixed}/>
            </div>
            <div className="w3-col l3 m6 s12 "  >
              <ScoreCard section= "Neutral" section_score = {this.state.neutral}/>
            </div>     
        </div>
         
      </div>   
         
     
   
      </div>
    );
  }
 
    
}

export default SignedIn
