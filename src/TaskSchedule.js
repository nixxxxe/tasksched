import { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';

function TaskSchedule() {
  const [task, setTask] = useState([]);
  const [highPriority, setHighPriority] = useState([]);
  const [regPriority, setRegPriority] = useState([]);
  const [regPriority2, setRegPriority2] = useState([]);
  const [regPriority3, setRegPriority3] = useState([]); 

  const randomValue = Math.ceil(Math.random() * 100);

  useEffect(() => {
    const highPriorityInterval = setInterval(() => {
      setHighPriority((prevPriority) => {
        if (prevPriority.length > 0) {
          const updatedProgress = [...prevPriority];
          updatedProgress[0] -= 1;
          if (updatedProgress[0] === 0) {
            updatedProgress.shift();
          }
          return updatedProgress;
        }
        return prevPriority;
      });
    }, 30);

    const regPriorityInterval = setInterval(() => {
      setRegPriority((prevPriority) => {
        if (prevPriority.length > 0) {
          const updatedProgress1 = [...prevPriority];
          updatedProgress1[0] -= 1;
          if (updatedProgress1[0] === 0) {
            updatedProgress1.shift();
          }
          return updatedProgress1;
        }
        return prevPriority;
      });
    }, 30);

    const regPriorityInterval2 = setInterval(() => {
      setRegPriority2((prevPriority) => {
        if (prevPriority.length > 0) {
          const updatedProgress = [...prevPriority];
          updatedProgress[0] -= 1;
          if (updatedProgress[0] === 0) {
            updatedProgress.shift();
          }
          return updatedProgress;
        }
        return prevPriority;
      });
    }, 30);

    const regPriorityInterval3 = setInterval(() => {
      setRegPriority3((prevPriority) => {
        if (prevPriority.length > 0) {
          const updatedProgress = [...prevPriority];
          updatedProgress[0] -= 1;
          if (updatedProgress[0] === 0) {
            updatedProgress.shift();
          }
          return updatedProgress;
        }
        return prevPriority;
      });
    }, 30);

    return () => {
      clearInterval(highPriorityInterval);
      clearInterval(regPriorityInterval);
      clearInterval(regPriorityInterval2);
      clearInterval(regPriorityInterval3); 
    };
  }, [highPriority, regPriority, regPriority2, regPriority3]);

  useEffect(() => {
    if (highPriority.length > 0 && highPriority[0] === 0) {
      setHighPriority((prevPriority) => prevPriority.slice(1));
    }
  }, [highPriority]);

  useEffect(() => {
    if (regPriority.length > 0 && regPriority[0] === 0) {
      setRegPriority((prevPriority) => prevPriority.slice(1));
    }
  }, [regPriority]);

  const addTask = () => {
    setTask((prevTask) => [...prevTask, randomValue]);
  };

  const admitTask = () => {
    const regPrioritySum = regPriority.reduce((sum, value) => sum + value, 0);
    const regPriority2Sum = regPriority2.reduce((sum, value) => sum + value, 0);
    const regPriority3Sum = regPriority3.reduce((sum, value) => sum + value, 0); 
  
    if (task.length > 0 && task[0] % 7 === 0) {
      const redTask = task[0];
      setHighPriority((prevPriority) => [...prevPriority, redTask]);
      setTask((prevTask) => prevTask.slice(1));
    } else {
      if (task.length > 0) {
        const blackTask = task[0];
  
        if (regPrioritySum <= regPriority2Sum && regPrioritySum <= regPriority3Sum) {
          setRegPriority((prevPriority) => [...prevPriority, blackTask]);
        } else if (regPriority2Sum <= regPrioritySum && regPriority2Sum <= regPriority3Sum) {
          setRegPriority2((prevPriority) => [...prevPriority, blackTask]);
        } else {
          setRegPriority3((prevPriority) => [...prevPriority, blackTask]); 
        }
          setTask((prevTask) => prevTask.slice(1));
      }
    }
  };
  

  return (
    <Grid container spacing={2} sx={{ width: 1000, margin: '0 auto', marginTop: '20px', marginBottom: '20px' }}>
      <Grid item xs={8} sx={{ height: 800, marginLeft: '0 auto', border: '2px solid' }}>
        <h1>TASK QUEUE</h1>

        <div style={{ marginTop: '16px', marginBottom: '8px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {task.map((t, index) => (
            <div key={index} 
            style={{ 
              border: '1px solid black', 
              marginRight: '1px', 
              marginBottom: '10px', 
              color: t % 7 === 0 ? 'red' : 'black' 
              }}>
              {t}
            </div>
          ))}
        </div>

        <Button onClick={addTask} variant="contained" sx={{ height: '35px', width: '120px' }}> Add a task </Button>
        <Button variant="contained" onClick={admitTask} sx={{ height: '35px', width: '120px', marginLeft: '5px' }}> Admit Task </Button>
      </Grid>

      <Grid container spacing={0} item xs={4} sx={{marginRight: 'auto', border: '2px solid' }}>

        <Grid item xs={12} sx={{ height: 180, border: '1px solid', marginRight: '17px' }}>
          <h3 style={{ marginLeft: '11px' }}>HIGH PRIORITY QUEUE</h3>
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {highPriority.map((t, index) => (
              <div key={index}
                style={{
                  marginLeft: '4px',
                  border: '1px solid black',
                  marginRight: '5px',
                  marginBottom: '10px',
                  color: 'red',
                }}
              >
                {t}
              </div>
            ))}
          </div>

          <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginLeft: '11px', marginRight: '10px' }}>Duration:</p>
            <div style={{ width: '100%', height: '20px' }}>
              <div
                style={{
                  width: `${highPriority[0]}%`,
                  height: '100%',
                  backgroundColor: 'red',
                }}
              />
            </div>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ height: 180, border: '1px solid', marginRight: '17px' }}>
          <h3 style={{ marginLeft: '11px' }}>REGULAR QUEUE 1</h3>
          <div style={{ marginTop: '3px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {regPriority.map((t, index) => (
              <div key={index}
                style={{
                  marginLeft: '4px',
                  border: '1px solid black',
                  marginRight: '1px',
                  marginBottom: '10px',
                  color: 'black',
                }}
              >
                {t}
              </div>
            ))}
          </div>

          <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginLeft: '11px', marginRight: '10px' }}>Duration:</p>
            <div style={{ width: '100%', height: '20px' }}>
              <div
                style={{
                  width: `${regPriority[0]}%`,
                  height: '100%',
                  backgroundColor: 'blue',
                }}
              />
            </div>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ height: 180, border: '1px solid', marginRight: '17px' }}>
          <h3 style={{ marginLeft: '11px' }}>REGULAR QUEUE 2</h3>
          <div style={{ marginTop: '1px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {regPriority2.map((t, index) => (
              <div key={index}
                style={{
                  marginLeft: '4px',
                  border: '1px solid black',
                  marginRight: '1px',
                  marginBottom: '10px',
                  color: 'black',
                }}
              >
                {t}
              </div>
            ))}
          </div>

          <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginLeft: '11px', marginRight: '10px' }}>Duration:</p>
            <div style={{ width: '100%', height: '20px' }}>
              <div
                style={{
                  width: `${regPriority2[0]}%`,
                  height: '100%',
                  backgroundColor: 'blue',
                }}
              />
            </div>
          </Grid>
        </Grid>

       
        <Grid item xs={12} sx={{ height: 180, border: '1px solid', marginRight: '17px' }}>
          <h3 style={{ marginLeft: '11px' }}>REGULAR QUEUE 3</h3>
          <div style={{ marginTop: '1px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {regPriority3.map((t, index) => (
              <div key={index}
                style={{
                  marginLeft: '4px',
                  border: '1px solid black',
                  marginRight: '1px',
                  marginBottom: '10px',
                  color: 'black',
                }}
              >
                {t}
              </div>
            ))}
          </div>

          <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginLeft: '11px', marginRight: '10px' }}>Duration:</p>
            <div style={{ width: '100%', height: '20px' }}>
              <div
                style={{
                  width: `${regPriority3[0]}%`,
                  height: '100%',
                  backgroundColor: 'blue',
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TaskSchedule;