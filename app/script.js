import React from 'react';
import { render } from 'react-dom';

const Description = () => (
<div>
  <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
  <p>This app will help you track your time and inform you when it's time to rest.</p>   
</div>
)


class App extends React.Component {

state = {
  status: 'off',
  time: 0,
  timer: null,
}

formatTime(time){
  let minutes = Math.floor(time/60)
  let sec = time - (60 * minutes)
  if(minutes < 10){
    minutes = '0' + minutes;
  }
  if(sec < 10){
    sec = '0' + sec
  }
  return minutes + ':' + sec;
}

step = () => {
  this.setState({
    time: this.state.time -1 
  });
  if(this.state.time == 0){ //status = work =>  status = rest
    this.playBell()
    if(this.state.status == 'work'){
      this.setState({
        status:  'rest',
        time: 20,
      })
    } else if(this.state.status == 'rest'){
      this.setState({
        status: 'work',
        time: 1200,
      })
    }
  }
} 

startTimer = () => {
  this.setState({
    status: 'work',
    time: 1200,
    timer: setInterval(this.step, 1000),
  });
}

stopTimer = () => {
  this.setState({
    status: 'off',
    time: 0,
  })
  clearInterval(this.state.timer);
}

closeApp = () => {
  window.close()
}

playBell = () => {
  let bell = new Audio('./sounds/bell.wav');
  bell.play();
}

  render() {
    const {status, time} = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
      {(status == 'off') && <Description/>}
       {(status == 'work') && <img src="./images/work.png" />}
       {(status == 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') &&<div className="timer">
        {this.formatTime(time)}
        </div>}
        {(status == 'off') && <button className="btn" onClick={this.startTimer}>Start</button> }
        {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button> }
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));


/*
- off:
asjfsajfnajsdfnasdjf
[START]

- work:
[obrazek pracusia]
[timer]
[STOP]

-rest:
[obrazek odpoczynek]
[timer]
[STOP]
*/