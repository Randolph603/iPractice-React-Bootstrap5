export default function main() {
    return (
        <div className="container">
            <ul className="list-group mt-5">
                <li onClick={() => window.open('/msal-page')} className="list-group-item">MsalPage</li>
                <li onClick={() => window.open('/wechat')} className="list-group-item">Boxing DB</li>
            </ul>

            <ul className="list-group mt-5">
                <li onClick={() => window.open('/bootstrap/album')} className="list-group-item">album</li>
                <li onClick={() => window.open('/bootstrap/blog')} className="list-group-item list-group-item-primary">blog</li>
                <li className="list-group-item list-group-item-secondary">A simple secondary list group item</li>
                <li className="list-group-item list-group-item-success">A simple success list group item</li>
                <li className="list-group-item list-group-item-danger">A simple danger list group item</li>
                <li className="list-group-item list-group-item-warning">A simple warning list group item</li>
                <li className="list-group-item list-group-item-info">A simple info list group item</li>
                <li className="list-group-item list-group-item-light">A simple light list group item</li>
                <li className="list-group-item list-group-item-dark">A simple dark list group item</li>
            </ul>
        </div>
    );
}