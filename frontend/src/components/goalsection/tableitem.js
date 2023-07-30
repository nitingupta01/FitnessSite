import {URL} from '../../constant/const';

function TableItem(props){

    const goals=props.goals;
    const setGoals=props.setGoals;
    async function deleteItem(){
        const response = await fetch(`${URL}/deletegoal` , {
            method:'POST',
            body:JSON.stringify({deleteid:props.goalid}),
            headers:{'Content-Type':'application/json'},
            credentials:'include',
        })
        if(response.status===200){
            response.json().then(goals=>setGoals(goals));
        }
    }
    return(
            <>
            <tr>
                <td>{props.goalName}</td>
                <td>{props.goalDuration}</td>
                <td>{props.goalDistance}</td>
                <td><i onClick={deleteItem} className="fa-solid fa-trash"></i></td>
            </tr>
            </>
    )
};

export default TableItem;