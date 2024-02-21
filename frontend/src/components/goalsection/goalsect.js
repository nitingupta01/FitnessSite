import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import '../stats/statsection.css';
import TableItem from "./tableitem";
import { TailSpin } from "react-loader-spinner";
import {URL} from '../../constant/const';


function Goalsection(){
    const [open, setOpen] = useState(false);
    const [goals,setGoals] = useState([]);
    const [goalName , setGoalName] = useState("");
    const [goalDuration , setGoalDuration] = useState();
    const [goalDistance , setGoalDistance] = useState();
    const [isLoading,setIsLoading]=useState(false);



    useEffect(()=>{
        setIsLoading(true);

        fetch(`${URL}/goals`,{credentials:'include'}).then(response=>{
            response.json().then(goals=>{
                setGoals(goals);
                setIsLoading(false);
            }).catch(err=>{console.log(err)
                setIsLoading(false);
            });
        }).catch(err=>{console.log(err)
            setIsLoading(false);
        });
    },[]);

    async function addGoal(e){
        e.preventDefault();
        
        try{
            const response  = await fetch(`${URL}/goals/new` , {
                method:'POST',
                body:JSON.stringify({goalName,goalDuration,goalDistance}),
                headers:{'Content-Type':'application/json'},
                credentials:'include',
            });
            if(response.status==200){
                response.json().then(goals=>{setGoals(goals)});
                setGoalName("");
                setGoalDistance();
                setGoalDuration();
            }
            else
                alert('Error');
        }
        catch(err){
            alert('Error');
        }
    }

    function CreateTable(item){
        return(
            <TableItem
                goalid={item._id}
                goalName={item.goalname}
                goalDuration={item.goalduration}
                goalDistance={item.goaldistance}
                setGoals={setGoals}
                goals={goals}
            />
        )
    }

    return(
        <>
            <Container className="stat-container">
                <span className="heading">ACTIVE GOALS</span>
                    <Button onClick={() => setOpen(!open)} id="btn">ADD GOALS</Button>
                <Collapse in={open}>
                <div className="create-goal-form-box">
                    <form onSubmit={addGoal}>
                        <label>GOAL NAME</label>
                        <input type="text" value={goalName} onChange={e=>{setGoalName(e.target.value)}}></input>
                        <label>GOAL DURATION (in minutes)</label>
                        <input type="number" value={goalDuration} onChange={e=>{setGoalDuration(e.target.value)}}></input>
                        <label>GOAL DISTANCE (in kilometres)</label>
                        <input type="number" value={goalDistance} onChange={e=>{setGoalDistance(e.target.value)}}></input>
                        <button>+</button>
                    </form>
                </div>
                </Collapse>

                <div className="active-goals">
                    <table>
                    <tr>
                        <th>GOAL</th>
                        <th>DURATION (in mns)</th>
                        <th>DISTANCE (in km s)</th>
                        <th>DELETE</th>
                    </tr>
                        {goals?.map(CreateTable)}
                    </table>
                    {isLoading && <div style={{display:"flex"}}>
                        <TailSpin
                            height="100"
                            width="100"
                            color="#800000"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{margin:"auto"}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>}
                    {goals.length===0 && !isLoading && <div style={{color:"red" , margin:"10px auto" , fontSize:"1.2rem" , fontWeight:"bold"}}>NO ACTIVE GOALS</div>}
                </div>
            </Container>
        </>
    )
}

export default Goalsection;