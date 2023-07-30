import { useEffect , useState } from 'react';
import { Container } from 'react-bootstrap';
import {URL} from '../../constant/const';
import './querytable.css';


function QueryTable(){
    const [data,setData]= useState([]);

    useEffect(()=>{
        fetch(`${URL}/getquery`).then(response=>{
            response.json().then(queries=>{
                setData(queries);
            })
        })
        console.log(data);
    },[]);

    function createRow(item){
        return(
            <>
            <tr>
            <td><a href={`mailto:${item.email}?subject=Mail from FitnessFreak`}>{item.name}</a></td>
            <td><a href={`mailto:${item.email}?subject=Mail from FitnessFreak`}>{item.email}</a></td>
            <td><a href={`mailto:${item.email}?subject=Mail from FitnessFreak`}>{item.query}</a></td>
            </tr>
            </>
        )
    }

    return(
        <>
            <Container>
                <table className='query-table'>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Query</th>
                    </tr>
                    {data?.map(createRow)}
                </table>
            </Container>
        </>
    )
}

export default QueryTable;