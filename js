const playerEntryStyles = {
  borderStyle: 'solid',
  borderWidth: 1,
  backgroundColor: '#C63D0F',
  textAlign: 'left', 
  height: 75,
  marginBottom: 5
};

const nameStyle = {
  position: 'relative',
  textAlign: 'left',
  width: '25%',
  paddingTop: 20,
  left: '22%',
  fontSize: 20
};

const imgStyle = {
  position: 'relative',
  width: 65,
  height: 65,
  top: -46,
  left: '8%'
};

const scoreStyle1 = {
  position: 'relative',
  top: -96,
  textAlign: 'center',
  left: '50%',
  width: '25%',
  borderStyle: 'solid',
  borderWidth: 0
};

const scoreStyle2 = {
  position: 'relative',
  top: -130,
  textAlign: 'center',
  left: '75%',
  width: '25%',
  borderStyle: 'solid',
  borderWidth: 0
};

const rankStyle = {
  position: 'relative',
  textAlign: 'left',
  top: -160,
  left: 10
};

const PlayerEntry = (props) => {
  var playerRank = props.rank;
  var playerName = props.name;
  var playerImg = props.img;
  var playerRecentScore = props.recentScore;
  var playerAllScore = props.allScore;
  
  return (<div style={playerEntryStyles}>
      <div style={nameStyle}><h5>{playerName}</h5></div>
      <img style={imgStyle} src={playerImg} />
      <div style={scoreStyle1}><h4>{playerRecentScore}</h4></div>
      <div style={scoreStyle2}><h4>{playerAllScore}</h4></div>
      <div style={rankStyle}><h5>{playerRank}</h5></div>
    </div>);
}

class Leaderboard extends React.Component {
  constructor(props){
    super(props);
    this.state = { array: [] };
    this.updateState = this.updateState.bind(this);
    //this.componentWillMount = this.componentWillMount.bind(this);
  }
  
  updateState(e){
    this.setState({ array: e });
  }
  
  componentWillMount(){
    $.ajax({
      url: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
      datatype: 'json',
      success: function(json) {
        var rk;
        var username;
        var ig;
        var rScore;
        var aScore;
        var outArr = [];
        
        for (var i = 0; i < 30; i++){
          var playerData = json[i];
          
          rk = i+1;
          username = playerData.username;
          ig = playerData.img;
          rScore = playerData.recent;
          aScore = playerData.alltime;
          
          var playerEntry = <PlayerEntry rank={rk} name={username} img={ig} recentScore={rScore} allScore={aScore} />;
          outArr.push(playerEntry);
        }
        this.setState({ array: outArr });
      }.bind(this)
    });
  }
  
  render() {
    return <div>{this.state.array}</div>;
  }
}

//var test = [<PlayerEntry rank='1' name='Apul' img='https://avatars2.githubusercontent.com/u/24684319?v=3' recentScore='100' allScore='1000' />, <PlayerEntry rank='1' name='Apul' img='https://avatars2.githubusercontent.com/u/24684319?v=3' recentScore='100' allScore='1000' />];
ReactDOM.render(<Leaderboard />, document.getElementById('stuff'));
