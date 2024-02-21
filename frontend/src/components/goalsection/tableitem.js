import {URL} from '../../constant/const';

function TableItem(props){

    const goals=props.goals;
    const setGoals=props.setGoals;
    async function deleteItem(){
        try{
            const response = await fetch(`${URL}/goals/delete` , {
                method:'POST',
                body:JSON.stringify({deleteid:props.goalid}),
                headers:{'Content-Type':'application/json'},
                credentials:'include',
            })
            if(response.status===200){
                response.json().then(goals=>setGoals(goals));
            }
        }
        catch(err){
            console.log(err);
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