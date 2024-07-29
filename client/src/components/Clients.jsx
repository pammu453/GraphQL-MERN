import { Table } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import ClientRow from "./ClientRow";
import Loader from "./Loader";

const Clients = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) return <Loader />;
    if (error) return <p>Error occured</p>;

    return (
        <>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !loading && !error && data.clients.length === 0 ?
                            <p>No clients found. Please add a new client.</p>
                            : data.clients.map((client) => {
                                return (
                                    <ClientRow key={client.id} client={client} />
                                )
                            })
                    }
                </tbody>
            </Table>
        </>
    )
};

export default Clients;
