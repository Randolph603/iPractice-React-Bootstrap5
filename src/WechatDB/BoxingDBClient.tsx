const appid = '***';
const secret = '***';
const grantType = 'client_credential';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';


export default function BoxingDBClient() {
    const getToken = () => {
        const uri = `/cgi-bin2/token?grant_type=${grantType}&appid=${appid}&secret=${secret}`;

        fetch(uri, { method: 'GET' })
            .then(blob => blob.json())
            .then(response => console.log(response));

    }
    getToken();
    return (<></>);
}