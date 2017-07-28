const playerEntryStyles = {
  //to be filled
}

const PlayerEntry = (props) => {
  var playerName = props.name;
  var playerImg = props.img;
  var playerRecentScore = props.recentScore;
  var playerAllScore = props.allScore;
  
  return (<div>
      <h3>{playerName}</h3>
      <img src={playerImg} />
      <h4>{playerRecentScore}</h4>
      <h4>{playerAllScore}</h4>
    </div>);
}

ReactDOM.render(<PlayerEntry name='Apul' img='https://avatars2.githubusercontent.com/u/24684319?v=3' recentScore='100' allScore='1000' />, 
document.getElementById('stuff'));
