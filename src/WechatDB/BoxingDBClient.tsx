const appid = 'wx526f3c76289b1f94';
const secret = 'fab9cfb54181d1b7c83971a96da4f2c8';
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