import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './ItemTile.css';

class ItemTile extends React.Component {

    render() {
        return (
            <Card className="item-tile">
                <CardContent>
                    <Typography>ID: {this.props.data.id}</Typography>
                    {JSON.stringify(this.props.data)}
                </CardContent>
                <CardActions>
                    {this.props.buttonText && <Button variant="outlined" onChange={() => this.props.buttonOnChange(this.props.data)}>{this.props.buttonText}</Button>}

                </CardActions>
            </Card>
        );
    }

}

export default ItemTile;