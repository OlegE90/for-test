import * as React from 'react';

/**
 * Свойства компонента.
 */
interface IProps {
    name: string;
}

export class Root extends React.Component<IProps, {}> {
    render() {
        const {name} = this.props;

        return (
            <div className="main-style">
                <h1>Hello {name}</h1>
                <form>
                    <input type="text"/> <br/>
                    <input type="text"/> <br/>
                    <input type="text"/> <br/>
                    <input type="text"/> <br/>
                </form>
            </div>
        );
    }
}