import {useState} from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState('')
  const [items, setItems] = useState('')
  
  const getData = (e) => {

    e.preventDefault();

    var containerObj = {};

    var lines = data.split('\n');
    for(var i = 0;i < lines.length;i++){
      containerObj[i] = lines[i]
    }
    
    const lambdaInput = JSON.stringify(containerObj);

    axios.post('https://sip5rqo367.execute-api.us-west-1.amazonaws.com/default/testfunction', {
      input: lambdaInput,
        }).then(response => {

          console.log(response)

          const a = response['data']['returnInfo']
          const copy = []
          for (let index = 0; index < a.length; ++index) {
            copy.push(['\n' + '\n' + 'Trailer ' + (index + 1) + '\n'])
            const b = a[index]
            for (let index2 = 0; index2 < b.length; ++index2) {
              copy.push('\n' + a[index][index2] + ' ')
            }
          }
          setItems(copy)
      })
  }

  return (
    <div className="App">
      <h1>Containerize</h1>
      <form onSubmit={getData}>
        <textarea type="text" rows="30" cols="150" value={data} required onChange={(e) => setData(e.target.value) }></textarea>
        <button style={{width : "70px", height : "20px"}}>Submit</button> 
      </form>
      <pre style={{fontSize: 15}}>{items}</pre>
    </div>
  );
}

export default App;
