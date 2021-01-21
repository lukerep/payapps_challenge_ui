import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import './ItemTile.css';

class ItemTile extends React.Component {

    render() {
        const lines = this.props.data.lines.map((line, index) => {
            return <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>{line.text}</TableCell>
                <TableCell>${line.originalValue}</TableCell>
                <TableCell>${line.currentValue}</TableCell>
            </TableRow>
        });
        return (
            <Card className="item-tile">
                <CardContent>
                    <Typography variant="caption">ID: {this.props.data.id}</Typography>
                    <Typography>Name: {this.props.data.header.name}</Typography>
                    <Typography>Location: {this.props.data.header.address}</Typography>
                    <Typography>Status: {this.props.data.state}</Typography>
                    {lines &&
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Original</TableCell>
                                    <TableCell>Current</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lines}
                            </TableBody>
                        </Table>
                    }
                </CardContent>
                <CardActions>
                    <Button disabled={this.props.data.state === "APPROVED"} color="primary" variant="text" onClick={() => this.props.onApprove(this.props.data)}>Approve</Button>
                    <Button disabled={this.props.data.state !== "APPROVED"} variant="outlined" onClick={() => this.props.onCreateClaim(this.props.data)}>Create Claim</Button>
                </CardActions>
            </Card>
        );
    }

}

export default ItemTile;