import { useState, useEffect } from 'react';
import { Input } from './components/forms/Input.jsx';
import { Number } from './components/forms/Number.jsx';
import { ContainerList } from './components/main/ContainerList.jsx';

let currentGame = localStorage.getItem('inputGameCurrent');

if (currentGame == undefined) {
    localStorage.setItem('inputGameCurrent', 'html');
    currentGame = 'html';
}

function App() {
    let completeDataList = [];
    let isEmpty = false;

    const [list, setList] = useState([]);
    const [completeList, setCompleteList] = useState([]);
    const [search, setSearch] = useState('');
    const [viewFull, setViewFull] = useState(false);
    const [data, setData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isSettings, setIsSettings] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('./data/html.json')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (data) {
            for (const element of data['data']) {
                completeDataList.push(element['element']);
            }
            setCompleteList(completeDataList);
        }
    }, [data]);

    useEffect(() => {
        const keyDownHandler = (event) => {
            let inputSearch = document.getElementById('input').value.trim();

            console.log(inputSearch);
            if (event.key === 'Enter') {
                console.log(completeList);

                if (completeList.includes(inputSearch)) {
                    if (true) {
                        list.push(inputSearch);
                        setList(list);
                        isEmpty = true;
                        setSearch('');
                    }
                }
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [data]);

    const handleToggle = () => {
        setViewFull(true);
    };

    return (
        <div>
            {isSettings && <p>Setiings</p>}
            {isLoading && <p>Loading...</p>}
            {data && (
                <>
                    <span role="group" style={{ display: 'flex' }}>
                        <Input value={search} onChange={setSearch} placeholder="Rechercher..." empty={isEmpty} />
                        <button onClick={handleToggle}>Show answers</button>
                        <Number value={list.length} totalValue={completeList.length} />
                    </span>
                    <ContainerList value={list} completeList={completeList} viewFull={viewFull} data={data['data']} />
                </>
            )}
        </div>
    );
}

export default App;
