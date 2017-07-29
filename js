//stylistic stuff
const playerEntryStyles = {
  borderStyle: 'solid',
  borderWidth: 1,
  backgroundColor: '#C63D0F',
  textAlign: 'left', 
  height: 75,
  marginBottom: 5
};

const nameStyle = {
  color: '#FDF3E7',
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
  color: '#FDF3E7',
  position: 'relative',
  top: -96,
  textAlign: 'center',
  left: '50%',
  width: '25%',
  borderStyle: 'solid',
  borderWidth: 0
};

const scoreStyle2 = {
  color: '#FDF3E7',
  position: 'relative',
  top: -130,
  textAlign: 'center',
  left: '75%',
  width: '25%',
  borderStyle: 'solid',
  borderWidth: 0
};

const rankStyle = {
  color: '#FDF3E7',
  position: 'relative',
  textAlign: 'left',
  top: -162,
  left: 20
};

//stores raw json data
var playerJsonArray;

//stores default display JSX
var defaultJSX;

//Generates player entry JSX
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

//outputs sorted json array by total score
function sortByTotal(inputArr) {
  var tempArr = inputArr;
  
  tempArr.sort(function(a, b){
    if (a.alltime > b.alltime) {return -1;}
    else if (a.alltime < b.alltime) {return 1;}
    else {return 0;}
  });
  
  return tempArr;
}

//input json array, outputs jsx array
function listJSX(inputArr) {
  var outArr = [];
  for (var i = 0; i < 30; i++){
    //json per player
    var playerData = inputArr[i];
          
    //relevant data per player
    var rk = i+1;
    var username = playerData.username;
    var ig = playerData.img;
    var rScore = playerData.recent;
    var aScore = playerData.alltime;
          
    //contruct jsx for each player
    var playerEntry = <PlayerEntry rank={rk} name={username} img={ig} recentScore={rScore} allScore={aScore} />;
    
    //add to array
    outArr.push(playerEntry);    
    }
  return outArr;
}

//handler function (total)
function handleSortByTotal(){
  var tempArr = sortByTotal(playerJsonArray);
  var outJSX = <div>{listJSX(tempArr)}</div>;
  
  ReactDOM.render(outJSX, document.getElementById('stuff'));
}

//handler function (30 days)
function handleSortBy30(){
  var outJSX = <div>{defaultJSX}</div>;
  ReactDOM.render(outJSX, document.getElementById('stuff'));
}

//generates leaderboard
class Leaderboard extends React.Component {
  constructor(props){
    super(props);
    this.state = { array: [] };
  }
  
  componentWillMount(){
    $.ajax({
      url: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
      datatype: 'json',
      success: function(json) {
        playerJsonArray = json;
        defaultJSX = listJSX(json);
        this.setState({ array: [] }); //this line has to be here for it to work?
      }.bind(this) //must bind to ensure this is properly referenced
    });
  }
  
  render() {
    return <div>{defaultJSX}</div>;
  }
}

ReactDOM.render(<Leaderboard />, document.getElementById('stuff'));
