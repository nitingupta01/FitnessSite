import { useEffect , useState } from 'react';
import { Container } from 'react-bootstrap';
import {URL} from '../../constant/const';
import './querytable.css';
import Users from '../userspage/usersadmin';
import { TailSpin } from 'react-loader-spinner';


function QueryTable(){
    const [data,setData]= useState([]);
    const [isLoading , setIsLoading]=useState(false);
    const [error,setError]=useState(null);

    useEffect(()=>{
        setIsLoading(true);
        fetch(`${URL}/query`).then(response=>{
            response.json().then(queries=>{
                setData(queries);
                setIsLoading(false);
                setError(null);
            }).catch(err=>{
                setIsLoading(false);
                setError(err);
        });
        }).catch(err=>{
            setIsLoading(false);
            setError(err);
        });
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
                {isLoading && <div style={{marginTop:"100px" , display:"flex"}}>
                        <TailSpin
                            height="200"
                            width="200"
                            color="#800000"
                            ariaLabel="tail-spin-loading"
                            radius="2"
                            wrapperStyle={{margin:"auto",alignItems:"center"}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>}
                {error && <div style={{marginTop:"100px", display:"flex"}}><img src='https://t4.ftcdn.net/jpg/05/92/91/99/360_F_592919939_IrEOZvIZuxDGZNsZlCfdOBBtEz8OoFkd.jpg' style={{width:"300px" , margin:"auto"}}></img></div>}

                {!error && !isLoading && <table className='query-table'>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Query</th>
                    </tr>
                    {data?.map(createRow)}
                </table>}
            </Container>
        </>
    )
}

export default QueryTable;